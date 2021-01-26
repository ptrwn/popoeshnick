
## API specification


| URI | Method | Action | Return |
| --- | --- |--- |--- |
| /api/user/registration/ | POST <br> {'email': 'foo@bar.com', 'password':'secret'} | Register new user | 201 - created, {'id': id_of_new_user } <br> 409 - already registered|
|/api/user/login/|POST <br> {'email': 'foo@bar.com', 'password':'secret'}|Log in existing user|200 - OK, set session cookie, {profile}<br>401 - Unauthorized, email not registered or password is wrong|
|/api/user/logout/|GET|Logout user, unset cookie|200 - OK|
|/api/user/profile/|GET|Send profile details|200 - OK, {profile}|
|/api/user/recovery/|POST<br>{'email': 'foo@bar.com'}|Email password reminder|200 - OK|


<br>

## User profile example
```
{
    "username": null,
    "email": "1@1.com",
    "lg_score": "0.00",
    "rank": "rank 1",
    "budget": "0",
    "parties_list": []
}
```