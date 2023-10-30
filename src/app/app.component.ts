import { Component } from '@angular/core';
import { Bank } from 'src/types/bank';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finance-observer';
  userBankData: Bank[] = [];

  ngOnInit() {
    const localStorageBankData = localStorage.getItem('userBankData');
    this.userBankData = localStorageBankData
      ? (JSON.parse(`${localStorageBankData}`) as Bank[])
      : [];
  }

  updateLocalStorage(banks: Bank[]) {
    console.log('Really it was updated', JSON.stringify(banks));
    localStorage.setItem('userBankData', JSON.stringify(banks));
  }

  downloadJSON() {
    // Holen des Inhalts aus dem Local Storage
    const localStorageData = localStorage.getItem('userBankData');

    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const jsonContent = JSON.stringify(data, null, 2); // Formatieren des JSON-Inhalts

      // Erstellen eines Blob (Binary Large Object) mit dem JSON-Inhalt
      const blob = new Blob([jsonContent], { type: 'application/json' });

      // Erstellen eines URL-Objekts, um den Blob zu verknüpfen
      const url = window.URL.createObjectURL(blob);

      // Erstellen eines HTML-A-Elements, um den Download-Link anzubieten
      const a = document.createElement('a');
      a.href = url;
      a.download = 'userBankData.json'; // Dateiname der herunterzuladenden Datei

      // Klicken auf das A-Element, um den Download zu initiieren
      a.click();

      // Bereinigen und freigeben von Ressourcen
      window.URL.revokeObjectURL(url);
    }
  }
  importJSON(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files && inputElement.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;

        try {
          const importedData = JSON.parse(fileContent);

          // Speichern der importierten Daten im Local Storage
          localStorage.setItem('userBankData', JSON.stringify(importedData));
          this.ngOnInit();

          // Hier kannst du weitere Aktionen ausführen, wenn die Daten importiert wurden.
        } catch (error) {
          alert('Fehler beim Importieren der JSON-Datei: ' + error);
        }
      };

      reader.readAsText(file);
    }
  }
}
