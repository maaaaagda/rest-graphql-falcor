*** Settings ***
Library                      Selenium2Library
Resource                     ./helpers.robot
Documentation                A test suite for testing meals functionality

*** Variables ***
${NAVBAR_DIETITIAN_PANEL}    xpath=//*[@id="navbar-dietitian-panel"]
${MEALS_LINK}                xpath=//*[@id="dietitian-panel-meals"]
${DIETS_LINK}                xpath=//*[@id="dietitian-panel-diets"]
${MELAS_HEADING}             xpath=//h1[text()="Dostępne posiłki"]
${MEALS_LIST}                xpath=(//*[contains(@class, 'DietCard')])
${ADD_MEAL_BUTTON}           xpath=//*[@id="add-meal-button"]
${EDIT_BUTTON}               xpath=//(//*[contains(@class, 'MealCard')])//div/a
${MEAL_FORM_NAME}            xpath=//input[@name='name']
${MEAL_FORM_RECIPE}          xpath=//textarea[@name='recipe']
${MEAL_FORM_PHOTO}           xpath=//input[@name='photo']
${SAVE_MEAL_BUTTON}          xpath=//div/form/button
${SAVE_MEAL_ERROR}           xpath=//*[contains(@class, "text-danger")]


*** Keywords ***

Open Dietitian Panel
    Click Element                               ${NAVBAR_DIETITIAN_PANEL}
    Sleep                                       2

Open Meals View
    Click Element                               ${MEALS_LINK}

Open Diets View
    Click Element                               ${DIETS_LINK}

Check If Meals View Is Rendered Properly
    Wait Until Page Contains Element            ${MEALS_HEADING}
    Wait Until Page Contains Element            ${MEAL_LIST}
    Wait Until Page Contains Element            ${ADD_MEAL_BUTTON}
    Wait Until Page Contains Element            ${EDIT_BUTTON}

Open New Meal Form
    Click Element                               ${ADD_MEAL_BUTTON}


Fill Meal Form
    Input Text                                  ${MEAL_FORM_NAME}                                     Tarta warzywna
    Input Text                                  ${MEAL_FORM_RECIPE}                                   Warzywa posiekaj. Przygotuj ciasto na tarte. Piecz w 200 stopniach
    Input Text                                  ${MEAL_FORM_PHOTO}                                    https://pics/vegatable_tart

Save Meal
    Click Element                               ${SAVE_MEAL_BUTTON}

*** Test Cases ***
Dietitian Panel Should Be Visible
    [Documentation]                             Check if dietitian panel view is rendered properly
    [Tags]                                      DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application
    Dashboard Page Should Be Open
    Open Dietitian Panel
    Open Meals View
    Open Diets View
    [Teardown]                                  Close Browser

Previewing meals should be possible
    [Documentation]                             Check if meals view is rendered properly
    [Tags]                                      DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application
    Dashboard Page Should Be Open
    Open Dietitian Panel
    Open Meals View
    Check If Meals View Is Rendered Properly
    [Teardown]                                  Close Browser


Adding New Meals Not Be Possible For User Different Than Dietitian
    [Documentation]                             Only dietitin should be able to add new meals
    [Tags]                                      DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application
    Dashboard Page Should Be Open
    Open Dietitian Panel
    Open Meals View
    Open New Meal Form
    Fill Meal Form
    Save Meal
    Sleep                                       3
    Page Should Contain Element                 ${SAVE_MEAL_ERROR}
    [Teardown]                                  Close Browser

Adding New Meals Be Possible For Dietitian
    [Documentation]                             Adding new meals with proper permissions should be possible
    [Tags]                                      DietsView Smoke ReadOnly
    Open Browser To Login Page
    Login Into Application As Dietitian
    Dashboard Page Should Be Open
    Open Dietitian Panel
    Open Meals View
    Open New Meal Form
    Fill Meal Form
    Save Meal
    Sleep                                       3
    Page Should Not Contain Element                 ${SAVE_MEAL_ERROR}
    [Teardown]                                  Close Browser

