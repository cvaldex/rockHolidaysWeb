import WhitelistJson from '../../assets/static-json/repeated-words-whitelist.json';

export default class RepeatedWordsUtil {
    static whiteListWords: string[] ;

    private static loadWhiteListWords(){
        if(this.whiteListWords === undefined || this.whiteListWords.length == 0){
            this.whiteListWords = WhitelistJson.whitelist.split(",");
        }

        //return this.whiteListWords;
    }

    static getRepeatedWords(text: string){
        var words = text != null ? text.trim().split(' ') : [];
        //cargar el mapa de palabras con la whitelist inicial
        var allWords = this.getMapWithWhiteListWords();  

        words.forEach(word => {
            var key = this.getCleanKeyFromWord(word).toLowerCase().trim(); //validate lower or upper case

            if(key.length > 0){
                var value = allWords.get(key);

                value = (typeof value == 'undefined') ? 1 : value + 1;

                allWords.set(key , value);
            }
        });

        var repeatedWords = [];

        for (var key of allWords.keys()) {
            var value = allWords.get(key);
            
            if(value > 1){
                repeatedWords.push(key);
            }
        }

        //console.log(repeatedWords);
        return repeatedWords;
    }

    /**
     * Funcion que hace trim y signos de puntuacion que podrían diferenciar entre palabras
     * @param word palabra a limpiar
     */
    private static getCleanKeyFromWord(word: string){
        var cleanWord = word.trim();

        cleanWord = cleanWord.replace(/,/g, "");
        cleanWord = cleanWord.replace(/\./g, "");
        cleanWord = cleanWord.replace(/;/g, "");
        cleanWord = cleanWord.replace(/'/g, "");
        cleanWord = cleanWord.replace(/"/g, "");
        cleanWord = cleanWord.replace(/!/g, "");
        cleanWord = cleanWord.replace(/¡/g, "");
        cleanWord = cleanWord.replace(/\?/g, "");
        cleanWord = cleanWord.replace(/¿/g, "");
        cleanWord = cleanWord.replace(/¿/g, "");
        cleanWord = cleanWord.replace(/\(/g, "");
        cleanWord = cleanWord.replace(/\)/g, "");
        cleanWord = cleanWord.replace(/\//g, "");

        return cleanWord;
    }

    private static getMapWithWhiteListWords(){
        var whiteListWordsMap = new Map();

        //cargar las palabras permitidas
        this.loadWhiteListWords();

        this.whiteListWords.forEach(word => {
            whiteListWordsMap.set(word.trim() , -1000);
        });

        return whiteListWordsMap;
    }
}

