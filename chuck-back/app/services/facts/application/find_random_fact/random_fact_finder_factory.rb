# frozen_string_literal: true

module Facts
  module Application
    module FindRandomFact
      # RandomFactFinderFactory: Factory to initialize FindRandomFact module resources
      class RandomFactFinderFactory
        def random_fact_finder
          RandomFactFinder.new(fact_repository)
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
