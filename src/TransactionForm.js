import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const SEARCH_CUSTOMERS = gql`
query SearchCustomers($lastName : String) {
    customers(lastName : $lastName) {
        id
        firstName
        lastName
        email
        phone
    }
}
`
const SALE_TRANSACTION = gql`
    mutation saleTransaction($customerId: String, $amount : String!, $paymentMethodToken : String, $paymentMethodNonce : String) {
        saleTransaction(customerId : $customerId, amount : $amount, paymentMethodToken : $paymentMethodToken, paymentMethodNonce : $paymentMethodNonce) {
            id
            status
            type
            currencyIsoCode
            amount
            merchantAccountId
            customer {
                id
                firstName
                lastName
                email
                phone        
            }
        }
    }
`

export function SaleTransaction() {
    let customerId;
    let paymentMethodNonce;
    let paymentMethodToken;
    const [saleTransaction, { loading: mutationLoading, error: mutationError, data }] = useMutation(SALE_TRANSACTION);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (customerId.value) {
                        saleTransaction({ variables: { customerId: customerId.value } });
                    }
                    if (paymentMethodNonce.value) {
                        saleTransaction({ variables: { paymentMethodNonce: paymentMethodNonce.value } });
                    }

                    if (paymentMethodToken.value) {
                        saleTransaction({ variables: { paymentMethodToken: paymentMethodToken.value } });
                    }
                }}
            >
                <input
                    ref={node => {
                        customerId = node;
                    }}
                /><br />
                <input
                    ref={node => {
                        paymentMethodNonce = node;
                    }}
                /><br />
                <input
                    ref={node => {
                        paymentMethodToken = node;
                    }}
                /><br />
                <button type="submit">Checkout</button>
            </form>
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :( Please try again</p>}

        </div>
    );
}