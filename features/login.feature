Feature: My feature name
  As a customer
  I should be able to do something
  So that I can benefit
  Scenario: Finding some cheese
    Given I am on the Google search page
    When I search for "Cheese!"
    Then the page title should start with "cheese"