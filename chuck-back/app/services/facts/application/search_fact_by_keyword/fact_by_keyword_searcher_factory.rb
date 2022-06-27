# frozen_string_literal: true

module Facts
  module Application
    module SearchFactByKeyword
      # FactByKeywordSearcherFactory: Factory to initialize SearchFactByKeyword module resources
      class FactByKeywordSearcherFactory
        def fact_by_keyword_searcher
          FactByKeywordSearcher.new(fact_repository)
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
