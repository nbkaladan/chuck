# frozen_string_literal: true

module Facts
  module Application
    module RegisterFactSearch
      # RegisterFactOnFactByCategorySearched: Listen for a search by category domain event and register it
      class RegisterFactOnFactByCategorySearched
        def fact_by_category_searched(event)
          FactSearchRegistererFactory.new.fact_search_registerer.register(
            event[:id],
            'category',
            event[:response],
            { category: event[:category] }
          )
        end
      end
    end
  end
end
