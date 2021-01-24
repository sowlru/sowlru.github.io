# List Folders Below
for f in sm; do 
   if [[ ${f} = sm ]]; then f1=SM; fi
   if [[ ${f} = mm ]]; then f1=MM; fi
   if [[ ${f} = lm ]]; then f1=LM; fi
	for t in thermal nonthermal; do
		if [[ ${t} = thermal ]]; then
			therm=thermal
			thermm=T
		else
			therm=""
			thermm=""
		fi
	# List Analysis Check Below
	for c in FB RB 
	do
		FFFF=${f1}${thermm}
		XXXX=HF_${f1}${thermm}_${c}	
		YYYY=HF_${f1}_${c}		
		ZZZZ=HF_${c}
					
		
		case $c in
		SK) 	pp=joint ;;
		FR)	pp=joint ;;
		MH1)    pp=mousehole;;
		MH2)    pp=mousehole;;
		*)	pp=nonjoint ;;
		esac
		
		# List Frame Stations
		for i in 1942
		do
			# List Sides
			for j in L R
			do
				if
					[ -e ../${FFFF} ]
				then
					echo ${FFFF} is present
				else
					echo Creating  ${FFFF} directory
					mkdir ../${FFFF}
				fi	
	
				if
					[ -e ../${FFFF}/${i}${j} ]
				then
					echo ${i}${j} is present
				else
					echo Creating  ${i}${j} directory
					mkdir ../${FFFF}/${i}${j}
				fi
				
				if 
					[ ${i} -lt 1880 ]
				then
					fin=vt
				else
					fin=""
				fi
				
									
				p=787-9-design-cycle-sec48${fin}${therm}${f}
	
				awk '{if ($0 == "feadms filea /"){printf("feadms filea %s /\n"), file_dta}else print $0}' file_dta="/home/bdc/users/evt0313/STIE_FWD_HF_FG/DTA/S${i}${j}_${YYYY}.dta" ../IDTAS_TEMPLATES/${p} > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}
	
				cat ../CSV/S${i}${j}_${ZZZZ}_elem.csv | sed  '1,2d' > temp1.txt
				cat temp1.txt | sed 's/[",]/ /g' > temp2.txt
				
				case ${pp} in
				joint)		awk ' { printf "%-18s %-18s %-18s %6.2f %6.2f %6.2f %6.1f %-1s\n", $2, $4, $5, $6, $7, $8, $9, "/" } ' temp2.txt > ../ELM/S${i}${j}_${XXXX}.ele;;
				mousehole)	awk ' { x= $5",10";printf "%-18s %-18s %-18s %6.2f %6.2f %6.2f %6.1f %-1s\n", $2, $4, x, $7, $8, $9, $10, "/" } ' temp2.txt > ../ELM/S${i}${j}_${XXXX}.ele;;
				*)		awk ' { printf "%-18s %-18s %-18s %6.2f %6.2f %6.2f %6.1f %-1s\n", $2, $4, $5, $6, $7, $8, $9, "/" } ' temp2.txt > ../ELM/S${i}${j}_${XXXX}.ele;;		
				esac				
				
				rm temp1.txt temp2.txt

				case ${pp} in
				joint)		awk ' BEGIN { printf "%18d %2d %3s\n", 126, 126, "/" }
				 	{ printf "%-18s %2d %-3s %-18s %-3s %-18s %-3s %-14.3f %-3s %-14.2f %-3s %-14.1f %-14s %-14s %-14s %-14s %-1s\n", $1, NR, "mat", $2, "mod", $3, "frf", $4, "dfr", $5, "mag", $6, "lna", "loc", "dna", "det", "/" } ' ../ELM/S${i}${j}_${XXXX}.ele > ../IN159/S${i}${j}_${XXXX}.in159 ;;
				mousehole)	awk ' BEGIN { printf "%18d %2d %3s\n", 756, 756, "/" }
				 	{ printf "%-18s %2d %-3s %-18s %-3s %-18s %-3s %-14.3f %-3s %-14.2f %-3s %-14.1f %-14s %-14s %-14s %-14s %-1s\n", $1, NR, "mat", $2, "mod", $3, "frf", $4, "dfr", $5, "mag", $6, "lna", "loc", "dna", "det", "/" } ' ../ELM/S${i}${j}_${XXXX}.ele > ../IN159/S${i}${j}_${XXXX}.in159 ;;
				*)		awk ' BEGIN { printf "%18d %2d %3s\n", 42, 42, "/" } 
					{ printf "%-18s %2d %-3s %-18s %-3s %-18s %-3s %-14.3f %-3s %-14.2f %-3s %-14.1f %-14s %-14s %-14s %-14s %-1s\n", $1, NR, "mat", $2, "mod", $3, "frf", $4, "dfr", $5, "mag", $6, "lna", "loc", "dna", "det", "/" } ' ../ELM/S${i}${j}_${XXXX}.ele > ../IN159/S${i}${j}_${XXXX}.in159 ;;
				esac				
							
				cat ../IN159/S${i}${j}_${XXXX}.in159 > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}.in159
				cat ../ELM/S${i}${j}_${XXXX}.ele > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}.ele
				cat ../IDTAS_TEMPLATES/${p}.cc > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}.cc
				cat ../IDTAS_TEMPLATES/${p}.equ > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}.equ
				cat ../IDTAS_TEMPLATES/${p}.sif > ../${FFFF}/${i}${j}/S${i}${j}_${XXXX}.sif
				echo . > p1
				echo S${i}${j}_${XXXX} > p2
				echo n > p3
				echo ${XXXX} > p4
				cat p1 p2 p3 p4 > ../${FFFF}/${i}${j}/s${i}${j}_${XXXX}.bat
				chmod 777 ../${FFFF}/${i}${j}/s${i}${j}_${XXXX}.bat
				rm p1 p2 p3 p4	
	
				echo "for w in 1942L 1942R
					do
					cd qkq
					if
						[ -e ${XXXX} ]
					then
						echo Deleteing old qkq ${XXXX} directory			
						rm ./${XXXX}/*
						rmdir ${XXXX}
					else
						echo $w Not present						
					fi
					idtas batch2 < sqkq_${XXXX}.bat
					if
						[ -e ./${XXXX}/pnt29b ]
					then
						echo Successful Run qkq
						cp ./${XXXX}/pnt29b ../../PNT29B/Sqkq_${XXXX}.pnt29b		
					else
						echo !?!? ERROR SEE WHY qkq !?!?		  
					fi
					cd ..
					done " > ../${FFFF}/zRun_idtas_${XXXX}_1.bat
			
					cat ../${FFFF}/zRun_idtas_${XXXX}_1.bat | sed 's/qkq/${w}/g' > ../${FFFF}/zRun_idtas_${XXXX}.bat
					rm ../${FFFF}/zRun_idtas_${XXXX}_1.bat

					chmod +x ../${FFFF}/zRun_idtas_${XXXX}.bat
					
			
				echo ${i}${j} ready
			done
	
		done
		
	cd ../${FFFF}
	../${FFFF}/zRun_idtas_${XXXX}.bat
		
	done
	done	
done

