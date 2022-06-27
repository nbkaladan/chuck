# frozen_string_literal: true

module Facts
  module Application
    module NotifyFactSearch
      # RandomFactFinder: Random fact finder use case
      class FactSearchNotifier
        def initialize(repository, notifier)
          @repository = repository
          @notifier = notifier
        end

        def notify(id, to)
          begin
            fact_search = @repository.find(id)
          rescue
            raise Domain::FactSearchNotFound
          end
          @notifier.notify(fact_search, to) unless fact_search.nil?
        end
      end
    end
  end
end
