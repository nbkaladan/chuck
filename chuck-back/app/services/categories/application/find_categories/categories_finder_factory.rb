# frozen_string_literal: true

module Categories
  module Application
    module FindCategories
      # CategoriesFinder: Factory to initialize Categories module resources
      class CategoriesFinderFactory
        def categories_finder
          CategoriesFinder.new(categories_repository)
        end

        private

        def client
          @client ||= Shared::Infrastructure::HttpClient.client(ENV['API_ENDPOINT'] || 'https://api.chucknorris.io/jokes/')
        end

        def categories_repository
          @categories_repository ||= Categories::Infrastructure::HttpCategoriesRepository.new(client)
        end
      end
    end
  end
end
