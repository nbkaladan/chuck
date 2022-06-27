# frozen_string_literal: true

module Facts
  module Application
    module RegisterFactSearch
      # RegisterFactOnFactByKeywordSearched: Listen for a search by category domain event and register it
      class RegisterFactOnFactByKeywordSearched
        def fact_by_keyword_searched(event)
          FactSearchRegistererFactory.new.fact_search_registerer.register(
            event[:id],
            'keyword',
            event[:response],
            { offset: event[:offset], limit: event[:limit] }
          )
        end
      end
    end
  end
end
