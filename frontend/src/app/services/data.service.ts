import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GameData } from '../interfaces/game-data.interface';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private axiosInstance: AxiosInstance;
  private gameData: GameData = {} as GameData;
  private gameBoard: Card[] = [];
  private gameId: string = '';
  private role: number = 0; 
  private dictionary: number = 0; 

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
    });
  }

  async createGame(): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/api/games/create?dict=${this.dictionary}`);
      this.gameId = response.data.gameId;
      return response.data;
    } catch (error) {
      // Handle the error, such as logging it or displaying a message to the user
      console.error(error);
    }
  }

  async getSatus(): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/api/games/${this.gameId}/status?player=${this.role}`);
      this.gameBoard = response.data.board;
      this.gameData = response.data;    
      return response.data;
    } catch (error) {
      // Handle the error, such as logging it or displaying a message to the user
      console.error(error);
    }
  }

  async commitCode(message: String): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(`/api/games/${this.gameId}/commit-code`, {
        "message":message
      });
      this.gameData = response.data;
      return response.data;
    } catch (error) {
      // Handle the error, such as logging it or displaying a message to the user
      console.error(error);
    }
  }

  async uncoverCard(cardIndex: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/api/games/${this.gameId}/agents/${cardIndex}/uncover`);   
      return response.data;
    } catch (error) {
      // Handle the error, such as logging it or displaying a message to the user
      console.error(error);
    }
  }


  getGameData(): GameData{
    return this.gameData;
  }

  getId(): string{
    return this.gameId;
  }

  setRole(role: number): void{
    this.role = role;
  }

  setDictionary(dictionary: number): void{
    this.dictionary = dictionary;
  }

  setGameId(gameId: string){
    this.gameId = gameId;
  }
}
