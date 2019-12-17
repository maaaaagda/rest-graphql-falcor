*** Settings ***
Library           Selenium2Library
Resource          ./helpers.robot
*** Test Cases ***

Logging into application should work properly
    [Documentation]    Opens a browser to login page, checks form submitting with valid and invalid credentials
    [Tags]    Loginpage Smoke ReadOnly
    Open Browser To Login Page
    Input Username    ${INVALID_USER}
    Input Password    ${INVALID_PASSWORD}
    Validation Error Should Appear
    Input Username    ${INVALID_USER_2}
    Submit Credentials
    Wrong Credentails Error Should Appear
    Input Username    ${VALID_USER}
    Input Password    ${VALID_PASSWORD}
    Submit Credentials
    Dashboard Page Should Be Open
    [Teardown]    Close Browser
