/**
 * @fileoverview
 * Simple Twitter search widget implementation to make a demonstration for debugging in JavaScript.
 *
 * @author Fatih Acet <fatih@fatihacet.com>
 */
var Demo = function() {
    this.isFetched = false;
    this.tweets = {};
};

/**
 * Twitter Search API base path.
 *
 * @const
 * @type {string}
 */
Demo.API_SEARCH_PATH = 'http://search.twitter.com/search.json';


/**
 * Calls tweet fetcher method to fetch and render tweets.
 *
 * @param {!string} query Search keyword that passed to Twitter API for getting tweets.
 */
Demo.prototype.getTweets = function(query) {
    this.tweetRequest_(Demo.API_SEARCH_PATH + '?q=' + query);
};


/**
 * Calls tweet fetcher method to fetch more tweets with same query string.
 */
Demo.prototype.getMoreTweets = function() {
    var url = Demo.API_SEARCH_PATH + this.tweets.next_page;
    this.tweetRequest_(url);
};


/**
 * This method makes a request to Twitter API with given query.
 *
 * @private
 * @param {!string} url Request Url.
 */
Demo.prototype.tweetRequest_ = function(url) {
    var that = this;

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url,
        success: function(data) {
            that.tweets = data;
            that.renderTweets();
            if (!that.isFetched) {
                that.buildMoreLink();
            }
            that.isFetched = true;
        }
    });
};


/**
 * Builds tweet items template and appends them into tweet container.
 */
Demo.prototype.renderTweets = function() {
    if (this.tweets && this.tweets.results) {
        this.$container = $('#tweetsContainer');
        var tweets = this.tweets.results;
        for (var i = 0, len = tweets.length; i < len; i++) {
            var tweet = tweets[i];
            var template = this.tweetsTemplate(tweet.profile_image_url, tweet.from_user_name, tweet.from_user, tweet.text);
            this.$container.append(template);
        }
    }
};


/**
 * Creates a get more tweet link and binds related event then appends it into tweet container.
 */
Demo.prototype.buildMoreLink = function() {
    var that = this;
    this.getMoreLink = $(this.moreLinkTemplate());
    this.$container.append(this.getMoreLink);

    this.getMoreLink.click(function(e){
        e.preventDefault();
        that.getMoreTweets();
    });
};


/**
 * Returns a tweet item markup with given tweet data.
 *
 * @param {!string} logo Logo path of tweet sender.
 * @param {!string} fullName Full name of tweet sender e.g. Fatih Acet.
 * @param {!string} userName User name of tweet sender e.g. fatihacet
 * @param {!string} tweet Body of the tweet.
 */
Demo.prototype.tweetsTemplate = function(logo, fullName, userName, tweet) {
    return '<div class="tweet">' +
                    '<img class="logo" src="' + logo + '" />' +
                    '<div class="fullName">' + fullName + ' - ' +
                        '<span class="userName">@' + userName + '</span>' +
                    '</div>' +
                '<div class="body">' + tweet + '</div>' +
            '</div>';
};


/**
 * A link template for get more tweet link.
 */
Demo.prototype.moreLinkTemplate = function() {
    return '<a href="#" class="getMoreTweet">Daha fazla tweet göster</a>';
};
