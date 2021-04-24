import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;

      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMap!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] =  [-57.52403120580182, -25.202981415689123]

  constructor() { }


  ngOnDestroy() {
    this.mapa.off('zoom', (ev) => {})
    this.mapa.off('zoomend', (ev) => {})
    this.mapa.off('move', (ev) => {})
  }

  ngAfterViewInit(): void {
    

    this.mapa = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        
        this.mapa.zoomTo(18)
      }
    })
    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];
      
    })

  } 


  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut() {

   this.mapa.zoomOut();

  }

  inputCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }

}
