import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms"
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

  form: FormGroup
  imagePreview: string
  private mode = 'create'
  private postId: string
  post: Post
  isLoading = false

  constructor(public postsService: PostService, public route: ActivatedRoute){ }

  ngOnInit(){
    this.form = new FormGroup({
      "name": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "hair": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "eyes": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "age": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]}),
      "power": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "genre": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "image": new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]})
    })

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit'
        this.postId = paramMap.get('postId')
        this.isLoading = true
        //this.post = this.postsService.getPost(this.postId)
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false
          this.post = {
            id: postData._id,
            name: postData.name,
            hair: postData.hair,
            eyes: postData.eyes,
            age: postData.age,
            power: postData.power,
            genre: postData.genre,
            imagePath: postData.imagePath
          }
          this.form.setValue({
            name: this.post.name,
            hair: this.post.hair,
            eyes: this.post.eyes,
            age: this.post.age,
            power: this.post.power,
            genre: this.post.genre,
            image: this.post.imagePath
          })
        })
      }else{
        this.mode = 'create'
        this.postId = null
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({image: file})
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
    console.log(file)
    console.log(this.form)
  }

  nombre = ['John', 'Amondergol', 'Riddler', 'Parker', 'Wade', 'Seraphina', 'Samir Alcantara', 'Gorka Sandoval', 'Benigno Gimenez', 'Gisela Santana', 'Ruth Postigo', 'Isabel Gimeno', 'Sagrario Belda', 'Ayoub Elvira', 'Siham Matos', 'Angelica Giner', 'Abdellah Ayuso', 'Unax San', 'Nayara Solano', 'Virgilio Castells', 'Rachida Uriarte', 'Arlo', 'Elaine', 'Remi', 'Isen']
  colores = ['Negro', 'Azul', 'Marr??n', 'Gris', 'Verde', 'Naranja', 'Rosa', 'P??rpura', 'Rojo', 'Blanco', 'Amarillo', 'Turquesa', 'Verde Oliva', 'Verde Menta', 'Borgo??a', 'Lavanda', 'Magenta', 'Salm??n', 'Cian', 'Beige', 'Rosado', 'Verde Oscuro', 'Verde Oliva', 'Lila', 'Amarillo P??lido', 'Fucsia', 'Mostaza', 'Ocre', 'Trullo', 'Malva', 'P??rpura']
  edad = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]
  poder = ['Adherencia', 'Aeroquinesis', 'Agilidad sobrehumana', 'Alas angel', 'Alienmorfismo', 'Aliento fuego', 'Aliento hielo', 'Aliento toxico', 'Aliento aire', 'Amnepat??a', 'Animaci??n', 'Aparici??n', 'Armadura natural', 'Atmoquinesis', 'Autodetonaci??n o explosi??n', 'Cambio de Fase', 'Cambio de Forma', 'Cambio de tama??o', 'Campo de fuerza', 'Carga Explosiva', 'Clariaudiencia', 'Clarividencia', 'Control mental', 'Convocaci??n', 'Criog??nesis', 'Cronoquinesis', 'Curaci??n', 'Deflexi??n', 'Duplicaci??n', 'Echokinesis', 'Elasticidad', 'Electroquinesis', 'Empat??a', 'Esferas de energ??a', 'Estallidos de plasma', 'Filo secreto', 'Fotoquinesis', 'Fusi??n', 'Geoquinesis', 'Gravedad', 'Grito s??nico', 'Herbog??nesis', 'Hidroquinesis', 'Hipnoquinesis', 'Ilusi??n', 'Ingesti??n de materia', 'Instinto Animal', 'Inteligencia sobrehumana', 'Intercambio de poder', 'Invisibilidad', 'Invocaci??n Irradiar', 'Levitaci??n', 'Liquidificaci??n', 'Magnetismo', 'Manipulaci??n de la masa', 'Manipulaci??n Molecular', 'Memoria Fotogr??fica', 'Metamorfosis', 'Miedo', 'Mimetismo', 'Negaci??n de poderes', 'Omniling??ismo', 'Origamikinesis', 'Petrificaci??n', 'Photokinesis', 'Piroquinesis', 'Premonici??n', 'Presciencia', 'Percepci??n de poder', 'Proyecci??n Astral', 'Psicometr??a', 'Pupila Fotogr??fica', 'Recuperaci??n mental', 'Sanaci??n acelerada', 'Seducci??n', 'Separaci??n', 'Sentido del peligro', 'Sintetizaci??n', 'Sonoquinesis', 'Sublimaci??n', 'Superfuerza', 'Supersentido', 'Supervelocidad', 'Sustituci??n de partes del cuerpo', 'Tecnopat??a', 'Tecnoquinesis Telara??a','Telequinesis','Telepat??a','Teletransportaci??n','Termoquinesis','Termovision','Transportaci??n el??ctrica','Umbraquinesis','Veneno','Viajar por el tiempo', 'Viscoficacion','Visi??n nocturna','Visi??n Rayos X','Visi??n T??rmica','Volar']

  onRandomPost(){
    this.form.controls['name'].setValue([...this.nombre].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)[0])
    this.form.controls['eyes'].setValue([...this.colores].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)[0])
    this.form.controls['hair'].setValue([...this.colores].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)[0])
    this.form.controls['age'].setValue([...this.edad].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)[0])
    this.form.controls['power'].setValue([...this.poder].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)[0])
  }

  onSavePost(){
    if(this.form.invalid){
      return
    }
    this.isLoading = true
    if(this.mode == 'create'){
      this.postsService.addPost(
        this.form.value.name,
        this.form.value.hair,
        this.form.value.eyes,
        this.form.value.age,
        this.form.value.power,
        this.form.value.genre,
        this.form.value.image
        )

    }else{
      this.postsService.updatePost(
        this.postId,
        this.form.value.name,
        this.form.value.hair,
        this.form.value.eyes,
        this.form.value.age,
        this.form.value.power,
        this.form.value.genre,
        this.form.value.image
      )
    }

    this.form.reset()
  }
}
