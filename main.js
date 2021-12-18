"use strict";


/* Encapsulation of the code */

let encap = (function() {


    /* Declaring global variables only in this scope */

    let selectMenu = 0;
    let nameData;
    let birthDateData;
    let addressData;
    let emailData;
    let telData;
    let initialDateData;
    let newDataId = 0;
    let delStat = true;
    let mailctrl = true;
    let flashingColor;
    let flashingColorRun = false;


    /* Menu select - appearance */

    $(".data1").slideUp(0);
    $(".menu11, .menu12, .menu13, .menu14").hover(function() {
        $(this).css("background-color", "#ffdb99");
        $(this).css("font-size", "12pt");
    }, function() {
        $(this).css("background-color", "#ffc14d");
        $(this).css("font-size", "10pt");
    });
    $(".menu11").click(function() {
        selectMenu = 1;
        $(".data1").slideUp(0);
        $(".data1").slideDown(0);
        $("#cardNumberInput").show();
        $("#name, #birthDate, #address, #email, #tel, #initialDate").show().css("background-color", "#FFDEAD");
        $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").hide();
        $(".data18").hide();
        $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17").show().css("background-color", "#FFA500");
        let d10 = $(".111").text();
        $(".data10").text(d10);
        $(".data10").css("font-size", "20pt");
        $("#cardNumber").css("background-color", "#ffffff");
        delStat = true;
    });
    $(".menu12").click(function() {
        selectMenu = 2;
        $(".data1").slideUp(0);
        $(".data1").slideDown(0);
        $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17, .data18").show().css("background-color", "#32CD32");
        $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").show();
        $("#cardNumberInput, #name, #birthDate, #address, #email, #tel, #initialDate").hide();
        let d10 = $(".112").text();
        $(".data10").text(d10);
        $(".data10").css("font-size", "20pt");
        $("#name, #birthDate, #address, #email, #tel").css("background-color", "#ffffff");
        $("#cardNumber, #initialDate").css("background-color", "#FFDEAD");
        $("#cardNumber").text($("#cardNumberInput").val());
        $("#nameInput").val(nameData);
        $("#birthDateInput").val(birthDateData);
        $("#addressInput").val(addressData);
        $("#emailInput").val(emailData);
        $("#telInput").val(telData);
        $("#initialDateInput").val(initialDateData);
        $(".data18").tooltip({
            position: { my: "bottom", at: "top-20" },
            show: { effect: "bounce", duration: 300, easing: "easeOutQuad", delay: 0 },
        });
        let outWidth = $(".main").outerWidth();
        if (outWidth > 600) {
            $(".data18").tooltip("enable");
        } else {
            $(".data18").tooltip("disable");
        };
        clearTimeout(flashingColor);
        $("#emailInput").css("background-color", "#ffffff");
        delStat = true;
    });
    $(".menu13").click(function() {
        selectMenu = 3;
        $(".data1").slideUp(0);
        $(".data1").slideDown(0);
        $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17, .data18").show().css("background-color", "#87CEFA");
        $("#cardNumberInput, #name, #birthDate, #address, #email, #tel, #initialDate").hide();
        $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").show();
        let d10 = $(".113").text();
        $(".data10").text(d10);
        $(".data10").css("font-size", "20pt");
        $("#name, #birthDate, #address, #email, #tel, #initialDate").css("background-color", "white");
        $("#cardNumber").css("background-color", "#FFDEAD");
        $("#nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").val("");
        $(".data18").tooltip({
            position: { my: "bottom", at: "top-20" },
            show: { effect: "bounce", duration: 300, easing: "easeOutQuad", delay: 0 },
        });
        let outWidth = $(".main").outerWidth();
        if (outWidth > 600) {
            $(".data18").tooltip("enable");
        } else {
            $(".data18").tooltip("disable");
        };
        clearTimeout(flashingColor);
        $("#emailInput").css("background-color", "#ffffff");
        delStat = true;
    });
    $(".menu14").click(function() {
        selectMenu = 4;
        $(".data1").slideUp(0);
        $(".data1").slideDown(0);
        $(".data10, .data11, .data12, .data13, .data18").show().css("background-color", "#ff4d4d");
        $("#name, #birthDate").show().css("background-color", "#ffb3b3");
        $("#cardNumberInput").show().css("background-color", "#ffffff");
        $(".data14, .data15, .data16, .data17").hide();
        $(".data18").show();
        $("#cardNumber, #nameInput, #birthDateInput").hide();
        let d10 = $(".114").text();
        $(".data10").text(d10);
        $(".data10").css("font-size", "20pt");
        $(".data18").tooltip("disable");
    });


    /* Defining messages and alerts */

    $(".main").after("<div id='mainMessage'>Üdvözöljük Önt a Demo Kft. törzsvásárlói kártyakezelő rendszerében! Ez a verzió minta adatokat tartalmaz, a kártyaszámok intervalluma: 1001-1015!<br><br>( Kattintson az X-re az ablak bezárásához! )</div>");
    $("#mainMessage").dialog({
        width: 350,
        height: 260,
        draggable: false,
        resizable: false
    });
    $(".main").after("<div id='delMessage' title='FIGYELMEZTETÉS!!!'><b>A kártya adatainak a végleges törlését kezdeményezte!<br>Valóban törölni akarja a rendszerből a kiválasztott kártyát???<br>Ha biztos benne, akkor zárja be ezt az ablakot és kattintson még egyszer az 'OK' gombra!!!</b></div>");
    $("#delMessage").hide();
    $(".main").after("<div id='emptyMessage' title='FIGYELMEZTETÉS!!!'>Minden mező kitöltése kötelező!!!<br>Kérem, töltse ki a hiányzó adatokat és kattintson ismét az 'OK' gombra!!!</div>");
    $("#emptyMessage").hide();


    /* Search the database */

    function calc() {
        let inputData = parseInt($("#cardNumberInput").val());
        let status = true;
        for (const key in cardData) {
            if (cardData[key].id == inputData) {
                $("#name").text(cardData[key].name);
                $("#birthDate").text(cardData[key].birthDate);
                $("#address").text(cardData[key].address);
                $("#email").text(cardData[key].email);
                $("#tel").text(cardData[key].tel);
                $("#initialDate").text(cardData[key].initialDate);
                status = false;
            }
        };
        if (status == true) {
            $("#name").text("Érvénytelen kártyaszám!!!");
            $("#birthDate").text("---");
            $("#address").text("---");
            $("#email").text("---");
            $("#tel").text("---");
            $("#initialDate").text("---");
        };
        nameData = $("#name").text();
        birthDateData = $("#birthDate").text();
        addressData = $("#address").text();
        emailData = $("#email").text();
        telData = $("#tel").text();
        initialDateData = $("#initialDate").text();
    };


    /* Generate a new card number */

    function idCalc() {
        let dataIdMax = (cardData.length) - 1;
        newDataId = (cardData[dataIdMax].id) + 1;
        $("#cardNumber").text(newDataId);
    };

    $(".menu13").click(function() {
        idCalc();
    });


    /* Validation */

    function mailvalid() {
        clearTimeout(flashingColor);
        let m = $("#emailInput").val();
        let m1 = m.includes("@");
        let m2 = m.includes(".");
        if (m1 == false || m2 == false) {
            function mailControl() {
                flashingColor = setTimeout(function() {
                    if (mailctrl == true) {
                        $("#emailInput").css("background-color", "#ffb3b3");
                        mailctrl = false;
                    } else {
                        $("#emailInput").css("background-color", "#ffffff");
                        mailctrl = true;
                    }
                    mailControl();
                }, 200);
            };
            mailControl();
            flashingColorRun = true;
        } else {
            clearTimeout(flashingColor);
            $("#emailInput").css("background-color", "#ffffff");
            flashingColorRun = false;
        }
    };


    /* Performing functions */

    function menuSwitch() {
        switch (selectMenu) {
            case 1:
                break;
            case 2:
                let dataModify = parseInt($("#cardNumberInput").val());
                for (const key in cardData) {
                    if (cardData[key].id == dataModify) {
                        (cardData[key].name = $("#nameInput").val());
                        (cardData[key].birthDate = $("#birthDateInput").val());
                        (cardData[key].address = $("#addressInput").val());
                        (cardData[key].email = $("#emailInput").val());
                        (cardData[key].tel = $("#telInput").val());
                        (cardData[key].initialDate = $("#initialDateInput").val());
                    }
                };
                $("#cardNumberInput").val("");
                calc();
                $("#cardNumberInput").val(dataModify);
                calc();
                $("#nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").val("");
                break;
            case 3:
                let data = { "id": "", "name": "", "birthDate": "", "address": "", "email": "", "tel": "", "initialDate": "" };
                data.id = newDataId;
                data.name = $("#nameInput").val();
                data.birthDate = $("#birthDateInput").val();
                data.address = $("#addressInput").val();
                data.email = $("#emailInput").val();
                data.tel = $("#telInput").val();
                data.initialDate = $("#initialDateInput").val();
                cardData.push(data);
                $("#nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").val("");
                idCalc();
                break;
            case 4:
                if (delStat == true) {
                    $("#delMessage").dialog({
                        width: 350,
                        height: 250,
                        draggable: false,
                        resizable: false
                    });
                    delStat = false;
                } else {
                    let delData = parseInt($("#cardNumberInput").val());
                    for (let i = 0; i < cardData.length; i++) {
                        if (cardData[i].id == delData) {
                            cardData.splice(i, 1);
                        }
                    };
                    $("#cardNumberInput").val("");
                    calc();
                    $("#cardNumberInput").val(delData);
                    calc();
                    delStat = true;
                };
                break;
        }
    };


    /* Send button click */

    $("#dataSend").click(function() {
        let nameInputBlank = $("#nameInput").val();
        let nameBlank = nameInputBlank.length;
        let birthDateInputBlank = $("#birthDateInput").val();
        let birthDateBlank = birthDateInputBlank.length;
        let addressInputBlank = $("#addressInput").val();
        let addressBlank = addressInputBlank.length;
        let emailInputBlank = $("#emailInput").val();
        let emailBlank;
        if (flashingColorRun == true) {
            emailBlank = 0;
        } else {
            emailBlank = emailInputBlank.length;
        };
        let telInputBlank = $("#telInput").val();
        let telBlank = telInputBlank.length;
        let initialDateInputBlank = $("#initialDateInput").val();
        let initialDateBlank = initialDateInputBlank.length;

        if (selectMenu == 2 || selectMenu == 3) {
            if (nameBlank == 0 || birthDateBlank == 0 || addressBlank == 0 || emailBlank == 0 || telBlank == 0 || initialDateBlank == 0) {
                $("#emptyMessage").dialog({
                    width: 350,
                    height: 150,
                    draggable: false,
                    resizable: false
                });
                $(".data18").tooltip({
                    disabled: true
                });
            } else {
                menuSwitch();
            }
        } else {
            menuSwitch();
        }
    });


    /* Date window format */

    $("#birthDateInput, #initialDateInput").datepicker({
        dateFormat: "yy-mm-dd",
        altField: "#szoveges",
        altFormat: "yy. MM d.",
        monthNames: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
        monthNamesShort: ["Jan", "Feb", "Márc", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szept", "Okt", "Nov", "Dec"],
        dayNamesMin: ["Vas", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
        firstDay: 1,
        showMonthAfterYear: true,
        changeMonth: true,
        changeYear: true,
        yearRange: "1920:2020",
        showOtherMonths: true,
        selectOtherMonths: true,
        showWeek: true,
        weekHeader: "#",
        showButtonPanel: false
    });


    /* Closure (IIFE --->>> return) */

    return {
        getCalc: () => {
            return calc();
        },
        getIdCalc: () => {
            return idCalc();
        },
        getMailValid: () => {
            return mailvalid();
        },
        getMenuSwitch: () => {
            return menuSwitch();
        },
    };

})();