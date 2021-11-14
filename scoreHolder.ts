import { EventEmitter } from "events"

interface IObject{
    match: any;
    scores: [any];
} 

export default class ScoreHolder extends EventEmitter {
    /**
     * Keeps the list of all the matches and scores of each match.
     * For this exercise we asume data is stored locally - it only works if we always use the same instance of this class object.
     * To solve this issue - the MatchList array should be stored globally.  
     * */
    MatchList: Array<IObject> = [];

    constructor(){
        super();
    }

    putScore(match: string, score: any):void {
        //let data = {id: match, scores: []};
        let added = false;
        this.MatchList.forEach((el) => {
            //if a match exists - find and add the score to it's list
            if(el.match == match){
                added = true;
                el.scores.push(score);
                this.emit(match, score);
            }
        });
        if(!added){
            //first time storing this match
            this.MatchList.push({match: match, scores: [score]});
            this.emit(match, score);
        }
    }

    getMatch(match: string): any{
        return this.MatchList.find((obj) => obj.match == match);
    }

    getScore(match: string): unknown {
        let matchObj = this.getMatch(match);
        if(matchObj){
            return matchObj.scores[matchObj.scores.length - 1];
        }
        return false; 
    }

    getHistory(match: string): unknown {
        let matchObj = this.getMatch(match);
        if(matchObj) return matchObj.scores;

        return false;
    }

    waitForNextScore(match: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            //wait for an event
            this.on(match, (recentScore) => resolve(recentScore));
        });
    }

    subscribe(match: string): void {
        this.on(match, (score)=>{
            console.log(`For match ${match} score received ${score}`);                       
        }).off(match, () => {});
    }

}