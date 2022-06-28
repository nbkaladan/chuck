# frozen_string_literal: true

module Categories
  module Infrastructure
    # HttpCategoriesRepositoryTest: Repository to search for categories through http api
    class HttpCategoriesRepositoryTest < ActiveSupport::TestCase
      test 'returns an array' do
        client = Shared::Infrastructure::HttpClient.client(ENV['API_ENDPOINT'] || 'https://api.chucknorris.io/jokes/')
        categories_repository = Categories::Infrastructure::HttpCategoriesRepository.new(client)

        response = categories_repository.all

        assert(response.is_a?(Array))
      end
    end
  end
end
