import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  `
    .mapa-container {
        height: 100%;
        width: 100%;
      }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarcadoresComponent implements OnInit, AfterViewInit, OnDestroy {

  ///////////////////////////////////

  @ViewChild('mapa') divMap!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] =  [-57.52403120580182, -25.202981415689123];

  marcadores: MarcadorColor[] = [];

  ////////////////////////////////////


  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('dragend', (ev)=>{})
  }
  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
      });

      this.inicarMarcadorDelLocal();

      // const marker = new mapboxgl.Marker().setLngLat(this.center)
      //                                     .addTo(this.mapa);
  }

  ngOnInit(): void {
  }

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat(this.center)
      .addTo(this.mapa)


    this.marcadores.push({
      color,
      marker: newMarcador
    });

    this.guardarMarcadorEnLocal()

    newMarcador.on('dragend', () => {
      this.guardarMarcadorEnLocal();
    })

  }

  irMarcador(marcador:  MarcadorColor) {
    const {lng, lat} = marcador.marker!.getLngLat();
    this.mapa.flyTo({
      center: [lng, lat]
    })
  }


  guardarMarcadorEnLocal() {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      // console.log(m.marker?.getLngLat());

      const color = m.color
      const {lng, lat} = m.marker!.getLngLat()


      lngLatArr.push({
        color: color,
        center: [lng, lat]
      })

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
    })

    
  }

  inicarMarcadorDelLocal() {

    if (! localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {
      const nuevoMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.center!).addTo(this.mapa);

      this.marcadores.push({
        marker: nuevoMarcador,
        color: m.color
      });

      nuevoMarcador.on('dragend', () => {
        this.guardarMarcadorEnLocal();
      })

    })


  }

  borrarMarcador(i : number) {
  
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i , 1);
    this.guardarMarcadorEnLocal();

  }

}
