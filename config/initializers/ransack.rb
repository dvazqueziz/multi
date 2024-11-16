Ransack.configure do |c|
  # Change default search parameter key name.
  # Default key name is :q
  c.search_key = :query

  c.custom_arrows = {
    up_arrow: '<i class="bi bi-chevron-up text-primary"></i>',
    down_arrow: '<i class="bi bi-chevron-down text-primary"></i>',
  }
end
