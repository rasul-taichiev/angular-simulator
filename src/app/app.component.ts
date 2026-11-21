import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { differentColor } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
    public lastVisitDate: string | null = '';
    public visitCount: string | null = null;
    public count: number = 0;
    public selectedLocation: string = '';
    public selectedDate: string = '';
    public participantsCount: any = null;
    public currentColor: differentColor = differentColor.BLUE;
    public currentDateTime: string = '';
    private timerId: ReturnType<typeof setInterval> | null = null;
    public clickCount: number = 0;
    public isTimerVisible: boolean = true;
    public liveInputText: string = '';
    public isLoading: boolean = true;
    private loadingTimeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        this.getVisitCount();
    }

    public get isFormInvalid(): boolean {
        const participants = Number(this.participantsCount);

        return (
            !this.selectedLocation ||
            !this.selectedDate ||
            this.participantsCount === null ||
            this.participantsCount === '' ||
            isNaN(participants) ||
            participants < 4
        );
    }

    ngOnInit() {
        // Timer
        this.updateDateTime();
        this.timerId = setInterval(() => {
            this.updateDateTime();
        }, 1000);

        this.loadingTimeoutId = setTimeout(() => {
            this.isLoading = false;
        }, 2000);

        this.lastVisitDate = localStorage.getItem('lastVisit');
        const currentDate = new Date().toLocaleString();
        localStorage.setItem('lastVisit', currentDate);
        // Вывод даты последнего визита
        console.log('Дата последнего визита:', this.lastVisitDate);

        // Вывод текущего цвета
        console.log('Текущий цвет:', this.currentColor);

        // Вывод результата работы метода getColor
        console.log('Результат проверки цвета:', this.getColor(this.currentColor));

        // --- Проверка нашей коллекции ---
        const boots = ['nike', 'adidas', 'puma'];
        const bootsList = new Collection<string>();
        bootsList.collection = boots;

        console.log(bootsList.getAllElements());
        console.log(bootsList.getOneElement(2));
        bootsList.replaceElement(1, 'li-ning');
        bootsList.deleteElement(1);
        console.log(bootsList.getAllElements());
        bootsList.clearCollection();

        // --- Проверка второй коллекции ---
        const prices = [1500, 2300, 4100];
        const pricesList = new Collection<number>();
        pricesList.collection = prices;

        console.log('Вторая коллекция:', pricesList.getAllElements());
        console.log('Элемент по индексу 0:', pricesList.getOneElement(0));
        pricesList.replaceElement(2, 5000);
        console.log('После замены:', pricesList.getAllElements());
        pricesList.deleteElement(0);
        console.log('После удаления:', pricesList.getAllElements());
        pricesList.clearCollection();
    }

    public onSearch(event: Event) {
        event.preventDefault();

        // Здесь твоя логика поиска тура
        console.log('Поиск запущен:', {
            location: this.selectedLocation,
            date: this.selectedDate,
            participants: this.participantsCount,
        });
    }

    public getColor(color: differentColor): boolean {
        if (
            color === differentColor.BLUE ||
            color === differentColor.RED ||
            color === differentColor.GREEN
        ) {
            return true;
        }
        return false;
    }

    public getVisitCount() {
        this.count = Number(localStorage.getItem('visitCount'));
        this.count++;
        localStorage.setItem('visitCount', String(this.count));
    }

    public updateDateTime(): void {
        this.currentDateTime = new Date().toLocaleString('ru-RU');
    }

    public ngOnDestroy(): void {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
        }
        if (this.loadingTimeoutId !== null) {
            clearTimeout(this.loadingTimeoutId);
        }
    }

    public increment(): void {
        this.clickCount++;
    }

    public decrement(): void {
        if (this.clickCount > 0) {
            this.clickCount--;
        }
    }
    public toggleTimer(): void {
        this.isTimerVisible = !this.isTimerVisible;
    }
}
