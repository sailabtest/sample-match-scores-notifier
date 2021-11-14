# sample-match-scores-notifier
Sample typescript app for providing match scores notifications upon every new score.
 
Requirements
* the producer can store an updated score for a given match by calling `putScore()`.
* The consumer can retrieve the latest score for a given match using `getScore()`.
* The consumer can wait for the next score for a given match using `waitForNextScore()`.
* The consumer can subscribe to (and unsubscribe from) score changes using `subscribe()`.
* The consumer can get the last N scores for a specific match by calling `getHistory`. N is defined when ScoreHolder class is instantiated.
* **No dependencies used in this implementation**
* `waitForNextScore()` and `subscribe()` should respond to `putScore()` being called.

Feel free to add to this sample source.
