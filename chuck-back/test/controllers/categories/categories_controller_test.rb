# frozen_string_literal: true

require "test_helper"

module Categories
  # CategoriesControllerTest: Endpoint to get all categories
  class CategoriesControllerTest < ActionDispatch::IntegrationTest
    test 'should return an array of categories' do
      get '/api/v1/categories'
      assert_equal(200, status)
      assert JSON(response.body).is_a?(Array)
    end
  end
end
