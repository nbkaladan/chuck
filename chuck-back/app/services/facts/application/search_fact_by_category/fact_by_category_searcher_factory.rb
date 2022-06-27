# frozen_string_literal: true

module Facts
  module Application
    module SearchFactByCategory
      # FactByCategorySearcherFactory: Factory to initialize SearchFactByCategory module resources
      class FactByCategorySearcherFactory
        def fact_by_category_searcher
          FactByCategorySearcher.new(fact_repository)
        end

        private

        def client
          @client ||= Shared::Infrastructure::HttpClient.client(ENV['API_ENDPOINT'] || 'https://api.chucknorris.io/jokes/')
        end

        def fact_repository
          @fact_repository ||= Infrastructure::HttpFactRepository.new(client)
        end
      end
    end
  end
end
