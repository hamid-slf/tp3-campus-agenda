import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};
const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}
function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}

type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}
type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  const { titre, categorie } = evenement;
  const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <Text style={styles.titreCarte}>{titre}</Text>
        <BadgeEtat statut={statut} />
      </View>

      <Text style={styles.information}>
        Catégorie : {categorie}
      </Text>

      <Text style={styles.information}>
        Places restantes : {places}
      </Text>
    </View>
  );
}

type BlocStatistiqueProps = {
  titre: string;
  valeur: number;
};

function BlocStatistique({ titre, valeur }: BlocStatistiqueProps) {
  return (
    <View style={styles.blocStatistique}>
      <Text style={styles.valeurStatistique}>{valeur}</Text>
      <Text style={styles.titreStatistique}>{titre}</Text>
    </View>
  );
}

export default function App() {
  const ateliersDisponibles = evenements.filter(
    e => e.categorie === 'Atelier' && placesRestantes(e) > 0
  );
  const mode: 'tous' | 'ateliers' = 'tous';

  const evenementsAffiches =
    mode === 'tous' ? evenements : ateliersDisponibles;
  const nombreTotal = evenements.length;

  const nombreComplets = evenements.filter(
    e => placesRestantes(e) === 0).length;

  const nombreAvecPlaces = evenements.filter(
    e => placesRestantes(e) > 0).length;

  const totalPlaces = evenements.reduce(
    (somme, e) => somme + placesRestantes(e),
    0
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.titrePrincipal}>CampusAgenda</Text>

      <Text style={styles.sousTitre}>
        Événements du campus
      </Text>
    <View style={styles.statistiques}>
      <BlocStatistique titre="Total" valeur={nombreTotal} />
      <BlocStatistique titre="Complets" valeur={nombreComplets} />
      <BlocStatistique titre="Avec places" valeur={nombreAvecPlaces} />
      <BlocStatistique titre="Places restantes" valeur={totalPlaces} />
    </View>
    <FlatList
      data={evenementsAffiches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CarteEvenement evenement={item} />
      )}
      ListEmptyComponent={
    <Text style={styles.information}>
      Aucun événement à afficher.
    </Text>
}
    />
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#F3F7FC',
  padding: 16,
  paddingTop: 45,
},
  carte: {
  backgroundColor: '#FFFFFF',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  width: '100%',
},

enteteCarte: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

titreCarte: {
  fontSize: 17,
  fontWeight: 'bold',
  color: '#17365D',
  flexShrink: 1,
},

information: {
  fontSize: 14,
  color: '#4B5563',
  marginTop: 4,
},

badge: {
  backgroundColor: '#DCEBFF',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
},

texteBadge: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#17365D',
},

blocStatistique: {
  backgroundColor: '#FFFFFF',
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  flex: 1,
},

valeurStatistique: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#17365D',
},

titreStatistique: {
  fontSize: 12,
  color: '#4B5563',
  textAlign: 'center',
},
titrePrincipal: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#17365D',
  marginBottom: 5,
},

sousTitre: {
  fontSize: 16,
  color: '#4B5563',
  marginBottom: 20,
},

statistiques: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginBottom: 20,
  width: '100%',
},
});
