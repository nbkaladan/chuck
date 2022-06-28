# frozen_string_literal: true

require 'test_helper'

module Categories
  module Application
    module FindCategories
      # CategoriesFinderShould: Test case
      class CategoriesFinderTest < ActiveSupport::TestCase
        test 'return existing categories' do
          mocked_response = Faker::ChuckNorris.fact.split
          stubs = Faraday::Adapter::Test::Stubs.new do |stub|
            stub.get('/categories') { |env| [200, {}, mocked_response] }
          end
          test = Faraday.new do |builder|
            builder.adapter :test, stubs
          end

          repository = Categories::Infrastructure::HttpCategoriesRepository.new(test)
          finder = CategoriesFinder.new(repository)

          assert finder.find == mocked_response
        end

        test 'raise a CategoriesNotFound exception when no categories found' do
          stubs = Faraday::Adapter::Test::Stubs.new do |stub|
            stub.get('/categories') { |env| [404, {}, nil] }
          end
          test = Faraday.new do |builder|
            builder.adapter :test, stubs
          end

          repository = Categories::Infrastructure::HttpCategoriesRepository.new(test)
          finder = CategoriesFinder.new(repository)

          assert_raises(Categories::Domain::CategoriesNotFound) do
            finder.find
          end
        end
      end
    end
  end
end
