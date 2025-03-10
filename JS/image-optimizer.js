let optimizeLog = [], optimizeFullSize = 0, optimizeConvertSize = 0

function OptimizeComicImages(comic_id, opened_comic, keyEvent) {
	if (opened_comic && downloadCounter > 0) { error("You Can't Optimze Image When you are Downloading Something!"); return }
	keydownEventIndex = null
	isOptimizing = true
	optimizeLog = []
	optimizeFullSize = 0
	optimizeConvertSize = 0

	procressPanel.config({ miniLog: true, miniSize:42, bgClose: false, closeBtn: false })
	procressPanel.reset(0)
	procressPanel.show('Calculating...')
	
	if (opened_comic) {
		window.stop()
		comicGroupsContainer.innerHTML = ''
		comicArtistsContainer.innerHTML = ''
		comicParodyContainer.innerHTML = ''
		comicTagsContainer.innerHTML = ''
		document.getElementById('c-p-t').textContent = ''
		document.getElementById('c-s-o').innerHTML = ''
		window.stop()
		const image_container = document.getElementById('c-p-i')
		image_container.innerHTML = ''
		window.stop()
	}

	setTimeout(() => {
		db.comics.findOne({ _id:comic_id }, (err, doc) => {
			if (err) { procressPanel.hide(); error(err); openComic(comic_id); isOptimizing = false; keydownEventIndex = keyEvent; return }
	
			if (opened_comic) document.getElementById('comic-action-panel').style.display='none'
			let ImagesCount = doc.c, formats = doc.f, image = doc.i, lastIndex = formats[0][1], thisForamat = formats[0][2], urls = [], formatIndex = 0, size

			for (let i = 0; i < ImagesCount; i++) {
				if (i <= lastIndex) {
					if (!fs.existsSync(`${dirUL}/${comic_id}${image}/${image}-${i}.${thisForamat}`)) procressPanel.add(`Image ${i+1}: Undownloaded Image.`, 'danger')
					else if (thisForamat != 'gif') urls.push([`${image}-${i}.${thisForamat}`, thisForamat])
					else {
						size = fs.statSync(`${dirUL}/${comic_id}${image}/${image}-${i}.${thisForamat}`).size
						optimizeFullSize += size
						optimizeConvertSize += size
						procressPanel.add("Warning: we can't optimize .gif!", 'warning')
					}
				} else {
					formatIndex++
					lastIndex = formats[formatIndex][1]
					thisForamat = formats[formatIndex][2]
					if (!fs.existsSync(`${dirUL}/${comic_id}${image}/${image}-${i}.${thisForamat}`)) procressPanel.add(`Image ${i+1}: Undownloaded Image.`, 'danger')
					else if (thisForamat != 'gif') urls.push([`${image}-${i}.${thisForamat}`, thisForamat])
					else {
						size = fs.statSync(`${dirUL}/${comic_id}${image}/${image}-${i}.${thisForamat}`).size
						optimizeFullSize += size
						optimizeConvertSize += size
						procressPanel.add("Warning: we can't optimize .gif!", 'warning')
					}
				}
			}
	
			procressPanel.changePercent(urls.length + 2)
			procressPanel.forward('Making Temp...')
			setTimeout(() => {
				size = 0
				for (let i = 0; i < urls.length; i++) {
					try {
						size = fs.statSync(`${dirUL}/${comic_id}${image}/${urls[i][0]}`).size
						optimizeFullSize += size
						optimizeLog.push(size)
						fs.renameSync(`${dirUL}/${comic_id}${image}/${urls[i][0]}`, `${dirTmp}/${urls[i][0]}`)
					} catch(err) {
						for (let j = 0; j < i; j++) {
							fs.renameSync(`${dirTmp}/${urls[j][0]}`, `${dirUL}/${comic_id}${image}/${urls[j][0]}`)
						}
						procressPanel.hide()
						error("MovingTemp: "+err)
						if (opened_comic) openComic(comic_id)
						isOptimizing = false
						keydownEventIndex = keyEvent
						return
					}
				}
				procressPanel.forward(`Optimizing Image (0/${urls.length})...`)
				convertImagesToOptimize(urls, 0, comic_id, image, () => {
					if (opened_comic) openComic(comic_id)
					keydownEventIndex = keyEvent
				})
			}, 10)
		})
	}, 250)
}

function convertImagesToOptimize(list, index, comic_id, image, callback) {
	if (index == list.length) {
		db.comics.update({_id:comic_id}, { $set: {o:0} }, {}, (err, doc) => {
			if (err) procressPanel.add('ConvertImageToOptimize: '+err, 'danger')
			if (setting.auto_close_optimize_panel) {
				procressPanel.reset(1)
				callback()
			} else {
				procressPanel.config({ bgClose:true, closeBtn:true })
				procressPanel.text(`___Complete___>>> <span class="tx-danger">${formatBytes(optimizeFullSize)}</span> To <span class="tx-danger">${formatBytes(optimizeConvertSize)}</span>`)
				callback()
			}
			PopAlert('Comic Images Has Been Optimize')
			isOptimizing = false
			if (setting.notification_optimization_finish && remote.Notification.isSupported()) new remote.Notification({title: 'Comic Optimization Finished.', body: doc.n}).show()
			if (setting.show_unoptimize) reloadLoadingComics()
		})
		isOptimizing = false
		return
	} else if (list[index][1] == 'jpg' || list[index][1] == 'jpeg') {
		sharp(`${dirTmp}/${list[index][0]}`).jpeg({ mozjpeg: true }).toFile(`${dirUL}/${comic_id}${image}/${list[index][0]}`).then(() => {
			try {
				const size = fs.statSync(`${dirUL}/${comic_id}${image}/${list[index][0]}`).size
				if (size <= optimizeLog[index]) {
					optimizeConvertSize += size
					procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(size)}</span>`)
					fs.unlinkSync(`${dirTmp}/${list[index][0]}`)
				} else {
					optimizeConvertSize += optimizeLog[index]
					procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span>`)
					fs.renameSync(`${dirTmp}/${list[index][0]}`, `${dirUL}/${comic_id}${image}/${list[index][0]}`)
				}
			} catch(err) {
				procressPanel.add('SavingFileSize: '+err, 'danger')
			}

			procressPanel.forward(`Optimizing Image (${index+1}/${list.length})...`)
			setTimeout(() => {
				convertImagesToOptimize(list, index + 1, comic_id, image, callback) 
			}, 1)
		}).catch(err => {
			procressPanel.add('Optimizing: '+err, 'danger')
		})
	} else if (list[index][1] == 'png') {
		sharp(`${dirTmp}/${list[index][0]}`).png({ quality: 100 }).toFile(`${dirUL}/${comic_id}${image}/${list[index][0]}`).then(() => {

			try {
				const size = fs.statSync(`${dirUL}/${comic_id}${image}/${list[index][0]}`).size
				if (size <= optimizeLog[index]) {
					optimizeConvertSize += size
					procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(size)}</span>`)
					fs.unlinkSync(`${dirTmp}/${list[index][0]}`)
				} else {
					optimizeConvertSize += optimizeLog[index]
					procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span>`)
					fs.renameSync(`${dirTmp}/${list[index][0]}`, `${dirUL}/${comic_id}${image}/${list[index][0]}`)
				}
			} catch(err) {
				procressPanel.add('SavingFileSize: '+err, 'danger')
			}

			procressPanel.forward(`Optimizing Image (${index+1}/${list.length})...`)
			setTimeout(() => {
				convertImagesToOptimize(list, index + 1, comic_id, image, callback) 
			}, 1)
		}).catch(err => {
			procressPanel.add('Optimizing: '+err, 'danger')
		})
	} else if (list[index][1] == 'webp') {
		sharp(`${dirTmp}/${list[index][0]}`).webp().toFile(`${dirUL}/${comic_id}${image}/${list[index][0]}`).then(() => {
			try {
				const size = fs.statSync(`${dirUL}/${comic_id}${image}/${list[index][0]}`).size
				optimizeConvertSize += size
				procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(size)}</span>`)
			} catch(err) {
				procressPanel.add('SavingFileSize: '+err, 'danger')
			}

			procressPanel.forward(`Optimizing Image (${index+1}/${list.length})...`)
			setTimeout(() => {
				convertImagesToOptimize(list, index + 1, comic_id, image, callback) 
			}, 1)
		}).catch(err => {
			procressPanel.add('Optimizing: '+err, 'danger')
		})
	} else {
		try {
			fs.renameSync(`${dirTmp}/${list[index][0]}`, `${dirUL}/${comic_id}${image}/${list[index][0]}`)

			const size = fs.statSync(`${dirUL}/${comic_id}${image}/${list[index][0]}`).size
			optimizeConvertSize += size
			procressPanel.addMini(`Img ${index+1} - From: <span class="tx-secendery tx-underline">${formatBytes(optimizeLog[index])}</span> To: <span class="tx-secendery tx-underline">${formatBytes(size)}</span>`)

			procressPanel.forward(`Optimizing Image (${index+1}/${list.length})...`)
			setTimeout(() => {
				convertImagesToOptimize(list, index + 1, comic_id, image, callback) 
			}, 1)
		} catch(err) {
			procressPanel.add('Optimize: '+err, 'danger')
		}
	}
}