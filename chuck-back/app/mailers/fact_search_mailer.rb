# frozen_string_literal: true

# FactSearchMailer: Mailer to send fact search results
class FactSearchMailer < ApplicationMailer
  default from: 'notifications@chuk_norris.com'

  def send(fact_search, to)
    @fact_search = fact_search
    mail(to: to, subject: 'Chuck Norris Fact Search results', template_path: 'fact_search_mailer', template_name: 'send')
  end
end
