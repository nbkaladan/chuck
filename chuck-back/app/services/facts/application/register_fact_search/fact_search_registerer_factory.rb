# frozen_string_literal: true

module Facts
  module Application
    module RegisterFactSearch
      # FactSearchRegistererFactory: Factory to initialize RegisterFactSearch module resources
      class FactSearchRegistererFactory
        def fact_search_registerer
          FactSearchRegisterer.new(fact_search_repository)
        end

        private

        def fact_search_repository
          @fact_search_repository ||= Infrastructure::SqliteFactSearchRepository.new
        end
      end
    end
  end
end
