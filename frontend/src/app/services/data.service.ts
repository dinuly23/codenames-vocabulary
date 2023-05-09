import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GameData } from '../interfaces/game-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private axiosInstance: AxiosInstance;
  private gameData: GameData = {} as GameData;
  private gameId: string = '';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
      // Add any other configuration here, such as headers, timeout, etc.
    });
  }

  async createGame(): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get('/api/games/create');
      this.gameId = response.data.gameId;
      return response.data;
    } catch (error) {
      // Handle the error, such as logging it or displaying a message to the user
      console.error(error);
    }
  }

  async getSatus(): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/api/games/${this.gameId}/status`);
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

  getGameData(): GameData{
    return this.gameData;
  }

  getId(): string{
    return this.gameId;
  }

}
