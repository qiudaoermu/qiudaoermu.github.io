class Jekyll::Converters::Markdown::MyCustomProcessor
  def initialize(config)
    require 'redcarpet'
    @config = config
  rescue LoadError
    STDERR.puts 'You are missing a library required for Markdown. Please run:'
    STDERR.puts '$ [sudo] gem install markdown'
    raise FatalException.new("Missing dependency: markdown")
  end

  def convert(content)
    puts '****************************************************************'
    ::Redcarpet::Render::HTML.new(render_options = {})
  end
end