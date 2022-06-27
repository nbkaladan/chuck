# frozen_string_literal: true

module Facts
  module Infrastructure
    # SqliteFactSearchRepository: Sqlite implementation for the FactSearch repository
    class SqliteFactSearchRepository
      def save(fact_search)
        model = FactSearch.new(
          id: fact_search.id,
          search_by: fact_search.search_by,
          response: fact_search.response,
          parameters: fact_search.parameters
        )

        model.save
      end

      def find(id)
        FactSearch.where(id: id).first
      end
    end
  end
end
