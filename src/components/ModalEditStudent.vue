<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { NotyfMessage } from "../utilities";
import { updateStudent } from "../httpRequest/studentRequest";

export default {
  props: ["studentData"],
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalDialog,
    SubmitButton,
  },

  data() {
    return {
      firstName: null,
      lastName: null,
      address: null,
      sexe: null,
      birthDate: null,
      birthPlace: null,
      lastSchool: null,
      lastGrade: null,
      gradeName: null,
      motherFullName: null,
      fatherFullName: null,
      responsiblePersonFullName: null,
      responsiblePersonnePhone: null,
      responsiblePersonneAddress: null,
    };
  },
  computed: {},
  methods: {
    setGrade(event) {
      this.gradeName = event.target.value;
      console.log(this.gradeName);
    },
    updateStudent() {
      if (
        (this.lastName != "") != "" ||
        this.address != "" ||
        this.responsiblePersonFullName != "" ||
        (this.sexe != "") != "" ||
        this.birthDate != "" ||
        this.birthPlace != "" ||
        this.firstName != "" ||
        this.responsiblePersonAddress != "" ||
        this.grade != "" ||
        this.motherFullName != "" ||
        this.responsiblePersonPhone != null ||
        this.fatherFullName != null
      ) {
        // if(
        //   this.lastName.trim() != ''  .trim() != '' || this.address .trim() != '' || this.responsiblePersonFullName .trim() != '' ||
        //   this.sexe .trim() != '' .trim() != '' || this.birthDate .trim() != '' || this.birthPlace.trim() != '' || this.firstName .trim() != '' ||
        //   this.responsiblePersonAddress .trim() != '' != '' || this.motherFullName .trim() != '' || this.responsiblePersonPhone .trim() != '' || this.fatherFullName .trim() != ''
        // ){

        //     console.log(
        //         {
        //     lastName: this.lastName,
        //     address: this.firstName,
        //     responsiblePersonFullName: this.responsiblePersonFullName,
        //     sexe: this.sexe,
        //     birthDate: this.birthDate,
        //     birthPlace: this.birthPlace,
        //     firstName: this.firstName,
        //     responsiblePersonAddress: this.responsiblePersonneAddress,
        //     motherFullName: this.motherFullName,
        //     responsiblePersonPhone: this.responsiblePersonnePhone,
        //     fatherFullName: this.fatherFullName
        // }
        // );
        updateStudent(this.studentData.id, {
          lastName: this.lastName,
          address: this.firstName,
          responsiblePersonFullName: this.responsiblePersonFullName,
          sexe: this.sexe,
          birthDate: this.birthDate,
          birthPlace: this.birthPlace,
          firstName: this.firstName,
          responsiblePersonAddress: this.responsiblePersonneAddress,
          motherFullName: this.motherFullName,
          responsiblePersonPhone: this.responsiblePersonnePhone,
          fatherFullName: this.fatherFullName,
        })
          .then(() => {
            this.$store.dispatch("fetchStudentByStudentId", this.studentData.id);
            NotyfMessage("Élève modifié avec succès", "success");
          })
          .catch((err) => {
            console.log(err);
          });
        //   }else{
        //   NotyfMessage("Tout les champs son requis", "danger");
        // }
      } else {
        NotyfMessage("Rien a modifier", "danger");
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchGrades");
  },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="editStudent">
      <i class="bi bi-pen"></i>
      <span> Modifier Info élève</span>
    </ModalOpenButton>
    <ModalContainer modalAction="editStudent">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Modifier Info éleve" />
        <ModalBody>
          <form v-on:submit.prevent="saveStudent">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mt-2">
              <div class="col-lg-12 col-sm-12 col-12 fs-6 fw-bold">
                Informations Élèves
              </div>
              <div class="col">
                <label for="nom" class="form-label">Nom</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  @input="(event) => (lastName = event.target.value.trim())"
                  :value="this.studentData.lastName"
                />
              </div>
              <div class="col">
                <label for="prenom" class="form-label">Prénom</label>
                <input
                  type="text"
                  class="form-control"
                  id="prenom"
                  @input="(event) => (firstName = event.target.value.trim())"
                  :value="this.studentData.firstName"
                />
              </div>
              <div class="col">
                <label for="address" class="form-label">Adresse</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  @input="(event) => (address = event.target.value.trim())"
                  :value="this.studentData.address"
                />
              </div>
              <div class="col">
                <label for="select-form">Sexe: </label> <br />
                <div class="btn-group" role="group">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="sexe"
                      :checked="this.studentData.sexe === 'masculin'"
                      id="masculin"
                      value="masculin"
                    />
                    <label class="form-check-label" for="masculin">Masculin</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="sexe"
                      :checked="this.studentData.sexe === 'feminin'"
                      id="feminin"
                      value="feminin"
                    />
                    <label class="form-check-label" for="feminin">Feminin</label>
                  </div>
                </div>
              </div>

              <div class="col">
                <label for="birthDate" class="form-label">Date Naissance</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthDate"
                  @input="(event) => (birthDate = event.target.value.trim())"
                  :value="this.studentData.birthDate"
                />
              </div>
              <div class="col">
                <label for="birthPlace" class="form-label">Lieu Naissance</label>
                <input
                  type="text"
                  class="form-control"
                  id="birthPlace"
                  @input="(event) => (birthPlace = event.target.value.trim())"
                  :value="this.studentData.birthPlace"
                />
              </div>
            </div>
            <hr />
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mt-2 g-3 mt-2">
              <div class="col-lg-12 col-sm-12 col-12 fs-6 fw-bold">
                Parents & Personne Responsable
              </div>
              <div class="col">
                <label for="fullnameFather" class="form-label">Nom Complet Père</label>
                <input
                  type="text"
                  class="form-control"
                  id="fullnameFather"
                  @input="(event) => (fatherFullName = event.target.value.trim())"
                  :value="this.studentData.fatherFullName"
                />
              </div>
              <div class="col">
                <label for="fullnameMother" class="form-label">Nom Complet Père</label>
                <input
                  type="text"
                  class="form-control"
                  id="fullnameMother"
                  @input="(event) => (motherFullName = event.target.value.trim())"
                  :value="this.studentData.motherFullName"
                />
              </div>
              <div class="col">
                <label for="responsiblePersonne" class="form-label"
                  >Nom Complet Personne Responsable</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="responsiblePersonne"
                  @input="
                    (event) => (responsiblePersonFullName = event.target.value.trim())
                  "
                  :value="this.studentData.responsiblePersonFullName"
                />
              </div>
              <div class="col">
                <label for="responsiblePersonnePhone" class="form-label"
                  >Telephone Personne Responsable</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="responsiblePersonnePhone"
                  @input="
                    (event) => (responsiblePersonnePhone = event.target.value.trim())
                  "
                  :value="this.studentData.responsiblePersonPhone"
                />
              </div>
              <div class="col">
                <label for="responsiblePersonneAddress" class="form-label"
                  >Adresse Personne Responsable</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="responsiblePersonneAddress"
                  @input="
                    (event) => (responsiblePersonneAddress = event.target.value.trim())
                  "
                  :value="this.studentData.responsiblePersonAddress"
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter
          ><SubmitButton
            name="Enregistrer"
            class="btn btn-primary"
            @click="updateStudent()"
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
