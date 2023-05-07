document.addEventListener('DOMContentLoaded', async function () {
    let datas = []
    try {
        datas = await getData('data/jadwalPelajaran.json')
    } catch (e) {
        document.body.innerHTML = unloaded()
    } finally {
        document.querySelector('#loading').style.display = "none"
    }
    const this_day = getThisDay()
    document.querySelector('#thisDay').innerText = this_day
    datas.forEach(data => {
        const table = createElement(data, this_day)
        document.querySelector('main').append(table)
    })
})

function getData(url) {
    return fetch(url).then(response => response.json()).then(response => response.xirpla)
}

// const header = document.querySelector('header')
// document.addEventListener('scroll', function () {
//     header.classList.toggle('border-b-0', window.scrollY > 32)
//     header.classList.toggle('shadow-md', window.scrollY > 32)
//     header.classList.toggle('backdrop-blur-md', window.scrollY > 32)
// })

function createElement(data, day) {
    const table = document.createElement('table')
    table.className = 'w-[360px] mb-7 rounded-md overflow-hidden shadow shadow-slate-400'
    if (data.hari == day) {
        table.classList.add('border-2')
        table.classList.add('border-blue-600')
        table.classList.add('shadow-md')
        table.classList.add('shadow-blue-600')
    }

    const rowDay = document.createElement('tr')
    const rowDayTh = document.createElement('th')
    rowDayTh.setAttribute('colspan', '3')
    rowDayTh.className = 'h-10 text-xl font-semibold bor bg-cyan-900 text-white'
    rowDayTh.innerText = data.hari
    rowDay.append(rowDayTh)
    table.append(rowDay)

    const rowHead = document.createElement('tr')
    rowHead.className = 'h-8 text-cyan-900'
    const waktuTh = document.createElement('th')
    const pelajaranTh = document.createElement('th')
    const guruTh = document.createElement('th')
    waktuTh.className = 'pl-2 text-left font-semibold w-[27%]'
    pelajaranTh.className = 'pl-2 text-left font-semibold w-[46%]'
    guruTh.className = 'pl-2 text-left font-semibold w-[27%]'
    waktuTh.innerText = 'waktu'
    pelajaranTh.innerText = 'pelajaran'
    guruTh.innerText = 'guru'
    rowHead.append(waktuTh, pelajaranTh, guruTh)
    table.append(rowHead)

    data.waktu.forEach((waktu, i) => {
        const pelajaran = data.pelajaran[i]
        const guru = data.guru[i]

        const rowData = document.createElement('tr')
        rowData.className = 'h-8'
        if (i % 2 == 0) {
            rowData.classList.add('bg-slate-100')
        }
        const waktuTd = document.createElement('td')
        const pelajaranTd = document.createElement('td')
        const guruTd = document.createElement('td')
        waktuTd.className = 'text-left pl-2 text-sm font-semibold'
        pelajaranTd.className = 'text-left pl-2'
        guruTd.className = 'text-left pl-2'
        waktuTd.innerText = waktu
        pelajaranTd.innerText = pelajaran
        guruTd.innerText = guru
        rowData.append(waktuTd, pelajaranTd, guruTd);
        table.append(rowData)
    })

    return table
}

function getThisDay() {
    const date = new Date()
    const day = date.getDay()
    switch (day) {
        case 0: return 'Minggu, Libur Horeee! hehe'
        case 1: return 'Senin'
        case 2: return 'Selasa'
        case 3: return 'Rabu'
        case 4: return 'Kamis'
        case 5: return "Jum'at"
        case 6: return "Sabtu"
    }
}

function unloaded() {
    return `<div class="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 flex justify-center items-center">
                <h1 class="text-xl text-white">data gak ke-load</h1>
            </div>`
}