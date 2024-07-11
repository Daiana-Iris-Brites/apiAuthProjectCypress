/// <reference types='cypress'/>
describe('Update Booking', () => {
    var token = ''
    var bookingId = ''

    before('Login', () => {
        cy.request({
            method:'POST',
            url:'/auth',
            body:{
                "username" : "admin",
                "password" : "password123"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            token = response.body.token
        })
    })

    beforeEach('Create Booking', () => {
        cy.request({
            method:'POST',
            url:'/booking/',
            body:{     
                "firstname" : "Jonatan", 
                "lastname" : "Brown",  
                "totalprice" : 2000,   
                "depositpaid" : true, 
                "bookingdates" :
                {       
                "checkin" : "2018-01-01",    
                "checkout" : "2019-01-01"    
                }, 
                "additionalneeds" : "Breakfast"
            }

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).to.eql(2000)
            bookingId = response.body.bookingid
        })
    })

    it('Update Bokking', () => {
        cy.request({
            method:'PUT',
            url:`/booking/${bookingId}`,
            body:{     
                "firstname" : "Jonatan", 
                "lastname" : "Brown",  
                "totalprice" : 3000,   
                "depositpaid" : true, 
                "bookingdates" :
                {       
                "checkin" : "2018-01-01",    
                "checkout" : "2019-01-01"    
                }, 
                "additionalneeds" : "Breakfast"
            },
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Cookie": `token=${token}`

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.totalprice).to.eql(3000)
        })
    })

    it('Update Bokking without token', () => {
        cy.request({
            method:'PUT',
            url:`/booking/${bookingId}`,
            failOnStatusCode:false,
            body:{     
                "firstname" : "Jonatan", 
                "lastname" : "Brown",  
                "totalprice" : 3000,   
                "depositpaid" : true, 
                "bookingdates" :
                {       
                "checkin" : "2018-01-01",    
                "checkout" : "2019-01-01"    
                }, 
                "additionalneeds" : "Breakfast"
            },
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            }
        }).then((response) => {
            expect(response.status).to.eq(403)
            expect(response.body).to.eql('Forbidden')
        })
    })

    it('Update Bokking with invalid token', () => {
        cy.request({
            method:'PUT',
            url:`/booking/${bookingId}`,
            failOnStatusCode:false,
            body:{     
                "firstname" : "Jonatan", 
                "lastname" : "Brown",  
                "totalprice" : 3000,   
                "depositpaid" : true, 
                "bookingdates" :
                {       
                "checkin" : "2018-01-01",    
                "checkout" : "2019-01-01"    
                }, 
                "additionalneeds" : "Breakfast"
            },
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Cookie": 'token=1254'
            }
        }).then((response) => {
            expect(response.status).to.eq(403)
            expect(response.body).to.eql('Forbidden')
        })
    })

})