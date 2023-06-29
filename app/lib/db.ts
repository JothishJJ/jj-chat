import { useEffect, useState } from 'react';
import { onSnapshot, collection, QuerySnapshot, DocumentData, Firestore } from 'firebase/firestore';
import { firestore } from './firebase';

interface Document {
  id: string;
  author: string;
  message: string;
}
      
      function useRealTimeCollection(collectionName: string) {
        const [documents, setDocuments] = useState<Document[]>([]);
        
          useEffect(() => {
              const collectionRef = collection(firestore as Firestore, collectionName);
                  const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
                        const updatedDocuments: Document[] = snapshot.forEach((doc) => ({
                                id: doc.id,
                                        title: doc.data().author,
                                                message: doc.data().message,
                                                      }));
                                                            setDocuments(updatedDocuments);
                                                                });
                                                                
                                                                    return () => {
                                                                          unsubscribe(); // Unsubscribe from the real-time updates
                                                                              };
                                                                                }, [collectionName]);
                                                                                
                                                                                  return documents;
                                                                                  };
                                                                                  
                                                                                  export default useRealTimeCollection;
                                                                                  