import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const prontos = functions.https.onRequest(async (request, response) => {

    const results = await admin.firestore()
        .collection('todos')
        .where('status', '==', 'true')
        .get();
    const feitos: any[] = [];
    results.forEach(result => {
        feitos.push({
            id: result.id,
            ...result.data()
        });
    });

    response.send(feitos);
});

export const totalTodos = functions.firestore
    .document('todos/{userId}')
    .onCreate((snap, context) => {

        const userId = snap.get('user_id');
        const docRef = 'users_count';
        const docUsers = admin.firestore().collection('todos').doc(docRef);

        // console.log(userId);

        return docUsers.get().then(async doc => {
            if (doc.exists) {
                // console.log('existe');
                const users_count = (doc.data()) ? doc.data() : undefined;
                if (users_count !== undefined) {
                    // console.log('not undefined');
                    if (users_count.hasOwnProperty(userId)) {
                        // console.log('Existe no doc');
                        users_count[userId]++;
                    } else {
                        // console.log('Não existe no doc');
                        const r = await admin.firestore().collection('todos')
                            .where('user_id', '==', userId).get();
                        users_count[userId] = r.docs.length;
                    }
                    // console.log(users_count);
                    return docUsers.update(users_count);
                } else {
                    // console.log('undefined');
                    const users_coun: any = {};
                    const r = await admin.firestore().collection('todos')
                        .where('user_id', '==', userId).get();
                    users_coun[userId] = r.docs.length;
                    // console.log(users_coun)
                    return docUsers.create(users_coun);
                }
            } else {
                // console.log('Não existe');
                const users_count: any = {};
                const r = await admin.firestore().collection('todos')
                    .where('user_id', '==', userId).get();
                users_count[userId] = r.docs.length;
                // console.log(users_count);
                return docUsers.create(users_count);
            }
        }).catch((error) => {
            console.log(error);
        });
    });
