from refreshtoken.models import RefreshToken

def jwt_response_payload_handler(token, user=None, request=None):
    payload = {
        'token': token,
    }

    app = 'auth_app'
    try:
        refresh_token = user.refresh_tokens.get(app=app).key
        print('*********************************************************SOME\n\n')
    except RefreshToken.DoesNotExist:
        refresh_token = None


    payload['refresh_token'] = refresh_token
    return payload