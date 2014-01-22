exports.ellipsize = function (text) {
    return text.slice(0, 300)
}

exports.pretty_date = function (date_string) {
    
    var date = new Date(date_string)
      , days =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      , months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      , pretty_date = ''
    
    pretty_date += days[date.getDay()]
    pretty_date += ', ' + months[date.getMonth()]
    pretty_date += ' ' + date.getDate()
    pretty_date += ' ' + date.getFullYear()
    return  pretty_date
}
