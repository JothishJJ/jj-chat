import { useEffect, useState } from 'react';
import { onSnapshot, collection, QuerySnapshot, DocumentData, Firestore } from 'firebase/firestore';
import { firestore } from './firebase';
      
      function useRealTimeCollection(collectionName: string) {
        const [documents, setDocuments] = useState<any[]>([]);
        
          useEffect(() => {
              const collectionRef = collection(firestore as Firestore, collectionName);
                  const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
                        const updatedDocuments: any[] = snapshot.forEach((doc) => ({
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
                                                                                  