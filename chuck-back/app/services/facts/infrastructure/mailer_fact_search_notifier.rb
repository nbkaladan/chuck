# frozen_string_literal: true

module Facts
  module Infrastructure
    # MailerFactSearchNotifier: Notify a fact search by email
    class MailerFactSearchNotifier
      def notify(fact_search, to)
        FactSearchMailer.new.send(fact_search, to)
      end
    end
  end
end
