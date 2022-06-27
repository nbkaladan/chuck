# frozen_string_literal: true

module Facts
  module Application
    module RegisterFactSearch
      # RegisterFactOnFactRandomSearched: Listen for a random fact search domain event and register it
      class RegisterFactOnFactRandomSearched
        def fact_random_searched(event)
          FactSearchRegistererFactory.new.fact_search_registerer.register(
            event[:id],
            'random',
            event[:response],
            nil
          )
        end
      end
    end
  end
end
