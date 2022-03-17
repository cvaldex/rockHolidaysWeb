//import WhitelistJson from '../../assets/static-json/repeated-words-whitelist.json';
import { RepeatedWordsWhitelistService } from '../api-services/repeated-words-whitelist.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RepeatedWordsUtil {
    whiteListWords: string[] ;

    constructor(private repeatedWordWhitelistService:RepeatedWordsWhitelistService){
        this.repeatedWordWhitelistService.getWhitelist().subscribe((response) => {
            var listaBlanca = response.listaBlanca;
            var whiteList = response.whiteList;

            listaBlanca = listaBlanca.replace(/"/g, "");
            whiteList = whiteList.replace(/"/g, "");

            var allWordsTmp = listaBlanca + "," + whiteList;
            this.whiteListWords = allWordsTmp.split(",");
        }, (err) => {
            console.log("Error loading whitelist: " + err.message);
        });
    }

    getRepeatedWords(text: string){
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
    private getCleanKeyFromWord(word: string){
        var cleanWord = word.trim();

        cleanWord = cleanWord.replace(/,/g, "");
        cleanWord = cleanWord.replace(/\./g, "");
        cleanWord = cleanWord.replace(/;/g, "");
        cleanWord = cleanWord.replace(/'/g, "");
        cleanWord = cleanWord.replace(/"/g, "");
        cleanWord = cleanWord.replace(/“/g, "");
        cleanWord = cleanWord.replace(/!/g, "");
        cleanWord = cleanWord.replace(/¡/g, "");
        cleanWord = cleanWord.replace(/\?/g, "");
        cleanWord = cleanWord.replace(/¿/g, "");
        cleanWord = cleanWord.replace(/¿/g, "");
        cleanWord = cleanWord.replace(/\(/g, "");
        cleanWord = cleanWord.replace(/\)/g, "");
        cleanWord = cleanWord.replace(/\//g, "");
        cleanWord = cleanWord.replace(/:/g, "");

        return cleanWord;
    }

    private getMapWithWhiteListWords(){
        var whiteListWordsMap = new Map();

        this.whiteListWords.forEach(word => {
            whiteListWordsMap.set(word.trim() , -1000);
        });

        return whiteListWordsMap;
    }
}
