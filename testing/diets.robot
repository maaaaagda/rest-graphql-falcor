*** Settings ***
Library           Selenium2Library
Resource          ./helpers.robot
Documentation     A test suite for testing diets functionality

*** Variables ***
${NAVBAR_DIETS}     xpath=//*[@id="navbar-diets"]
${DIETS_HEADING}    xpath=//h1[text()="Dostępne diety"]
${DIET_LIST}        xpath=(//*[contains(@class, 'DietCard')])
${DIET_PRICE}       xpath=(//*[@id="diet-daily-cost"])

*** Keywords ***

Open Diets View
    Click Element  ${NAVBAR_DIETS}
    Sleep   2

Check If Diets View Is Rendered Properly
    Wait Until Page Contains Element  ${DIETS_HEADING}
    Wait Until Page Contains Element    ${DIET_LIST}

Check If Diet Price Is Correct
    ${dietPriceElem}=   Catenate  ${DIET_PRICE} [1]
    ${price}=   Get Text   ${dietPriceElem}
    Should Be Equal     ${price}  55.99zł / dzień

Open Diet Details View
    ${dietElemButton}=   Catenate  ${DIET_LIST} [1]//a
    Click Element   ${dietElemButton}

Check Diet Details View
    Wait Until Page Contains   Dieta Sport
    Wait Until Page Contains   lunch
    Wait Until Page Contains   kolacja
*** Test Cases ***

Previewing diets should be possible
    [Documentation]    Check if diets view is rendered properly
    [Tags]    DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application
    Dashboard Page Should Be Open
    Open Diets View
    Check If Diets View Is Rendered Properly
    Check If Diet Price Is Correct
    [Teardown]    Close Browser

Previewing diet details should be possible
    [Documentation]    Check if diet details view is rendered properly
    [Tags]    DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application
    Dashboard Page Should Be Open
    Open Diets View
    Open Diet Details View
    Check Diet Details View
    [Teardown]    Close Browser
