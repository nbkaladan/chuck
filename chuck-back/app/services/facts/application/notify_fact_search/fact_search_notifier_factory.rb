# frozen_string_literal: true

module Facts
  module Application
    module NotifyFactSearch
      # FactSearchNotifierFactory: Factory to initialize NotifyFactSearch module resources
      class FactSearchNotifierFactory
        def fact_search_notifier
          FactSearchNotifier.new(fact_search_repository, notifier)
        end

        private

        def notifier
          @notifier ||= Infrastructure::MailerFactSearchNotifier.new
        end

        def fact_search_repository
          @fact_search_repository ||= Infrastructure::SqliteFactSearchRepository.new
        end
      end
    end
  end
end
