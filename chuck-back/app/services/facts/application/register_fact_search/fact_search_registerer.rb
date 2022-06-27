# frozen_string_literal: true

module Facts
  module Application
    module RegisterFactSearch
      # FactSearchRegisterer: Register a fact search
      class FactSearchRegisterer
        def initialize(repository)
          @repository = repository
        end

        def register(id, search_by, response, parameters)
          fact_search = Facts::Domain::FactSearch.new(id, search_by, response, parameters)
          @repository.save(fact_search)
        end
      end
    end
  end
end
