import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  flag!:number;
  dobavljaci!:Dobavljac[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Porudzbina>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public service:PorudzbinaService,
    public dobavljacService:DobavljacService
  ) {}

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljacs().subscribe(
      (data) => {
        this.dobavljaci = data;
      }
    )
  }

  public compare(a:Porudzbina, b:Porudzbina) {
    return a.id==b.id;
  }

  public add() {
    this.service.addPorudzbina(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Porudzbina sa ID: ${data.id} je uspešno dodata.`, `U redu`, {duration: 2500});
      }
    ),
    (error:Error) => {
      this.snackBar.open(`Neusešno dodavanje!`, `Zatvori`, {duration: 2500});
    }
  }

  public update() {
    this.service.updatePorudzbina(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Porudzbina sa ID: ${data.id} je uspešno ažurirana.`, `U redu`, {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neusešno ažuriranje!`, `Zatvori`, {duration: 2500});
    }
  }

  public delete() {
    this.service.deletePorudzbina(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`Porudzbina je uspešno obrisana.`, `U redu`, {duration: 2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neusešno brisanje!`, `Zatvori`, {duration: 2500});
    }
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmena`, `Zatvori`, {duration: 2500});
  }
}
